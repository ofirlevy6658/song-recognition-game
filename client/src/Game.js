import { useEffect, useState } from "react";
import Answer from "./Answer";
import correctSound from "./correct.mp3";
import incorrect from "./incorrect.mp3";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Game = ({ songs, songsName }) => {
	const [currentSong, setCurrentSong] = useState();
	const [answers, setAnswers] = useState();
	const [player, setPlayer] = useState(new Audio());
	const [countAnswer, setCountAnswer] = useState(0);
	const [timer, setTimer] = useState(15);
	const [score, setScore] = useState(0);

	useEffect(() => {
		startGame();
	}, [countAnswer]);

	const startGame = () => {
		const selectedSong = songs[Math.floor(Math.random() * songs.length)];
		setCurrentSong(selectedSong);
		const answers = randomAnswers();
		answers.push(selectedSong.name);
		shuffle(answers);
		setAnswers(answers);
		const newPlayer = player;
		player.volume = 0.15;
		newPlayer.src = selectedSong.file;
		setPlayer(newPlayer);
		player.play();
	};

	const randomAnswers = () => {
		return [
			songs[Math.floor(Math.random() * songsName.length)].name,
			songs[Math.floor(Math.random() * songsName.length)].name,
			songs[Math.floor(Math.random() * songsName.length)].name,
		];
	};

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	const handleAnswers = (e) => {
		player.pause();
		if (currentSong.name === e.target.innerHTML) {
			correntAnswer();
		} else {
			incorrectAnswer();
		}
	};

	const correntAnswer = () => {
		setScore(timer);
		console.log(score);
		const newPlayer = player;
		newPlayer.src = correctSound;
		setPlayer(newPlayer);
		player.play();
		setTimeout(() => {
			console.log("This will run after 1 second!");
			setCountAnswer(countAnswer + 1);
		}, 2000);
	};
	const incorrectAnswer = () => {
		const newPlayer = player;
		newPlayer.src = incorrect;
		setPlayer(newPlayer);
		player.play();
		setTimeout(() => {
			console.log("This will run after 1 second!");
			setCountAnswer(countAnswer + 1);
		}, 2000);
	};

	return (
		<>
			<CountdownCircleTimer
				isPlaying
				duration={15}
				colors={[
					["#004777", 0.33],
					["#F7B801", 0.33],
					["#A30000", 0.33],
				]}
			>
				{({ remainingTime }) => {
					console.log(remainingTime);
					setTimer(remainingTime);
					return remainingTime;
				}}
			</CountdownCircleTimer>
			{answers && (
				<Answer
					answers={[answers[0], answers[1], answers[2], answers[3]]}
					handleAnswers={handleAnswers}
				/>
			)}
		</>
	);
};

export default Game;
