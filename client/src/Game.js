import { useEffect, useState } from "react";
import Answer from "./Answer";

const Game = ({ songs, songsName }) => {
	const [currentSong, setCurrentSong] = useState();
	const [answers, setAnswers] = useState();
	const [player, setPlayer] = useState(new Audio());
	const [countAnswer, setCountAnswer] = useState(0);

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
		player.volume = 0.45;
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
		console.log(countAnswer);
		if (currentSong.name === e.target.innerHTML) {
			player.pause();
			setCountAnswer(countAnswer + 1);
		}
	};

	return (
		<>
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
