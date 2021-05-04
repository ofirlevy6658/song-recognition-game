import { useEffect, useState } from "react";
import Answer from "./Answer";
import correctSound from "./correct.mp3";
import incorrect from "./incorrect.mp3";

import "./css/game.css";
const Game = ({ songs, songsName }) => {
	const [currentSong, setCurrentSong] = useState();
	const [answers, setAnswers] = useState();
	const [player, setPlayer] = useState(new Audio());
	const [countAnswer, setCountAnswer] = useState(0);
	const [timer, setTimer] = useState(10);
	const [score, setScore] = useState(0);
	let tic;

	useEffect(() => {
		if (countAnswer === 5) endTurns();
		else startGame();
	}, [countAnswer]);

	useEffect(() => {
		if (timer !== 0) {
			tic = setTimeout(() => {
				setTimer(timer - 1);
			}, 1000);
		} else incorrectAnswer();
	}, [timer]);

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
		clearTimeout(tic);
		player.pause();
		if (currentSong.name === e.target.innerHTML) {
			correntAnswer();
		} else {
			incorrectAnswer();
		}
	};

	const correntAnswer = () => {
		setScore(score + timer);
		const newPlayer = player;
		newPlayer.src = correctSound;
		setPlayer(newPlayer);
		player.play();
		setTimeout(() => {
			setCountAnswer(countAnswer + 1);
			setTimer(10);
		}, 2000);
	};
	const incorrectAnswer = () => {
		console.log(countAnswer);
		const newPlayer = player;
		newPlayer.src = incorrect;
		setPlayer(newPlayer);
		player.play();
		setTimeout(() => {
			setCountAnswer(countAnswer + 1);
			setTimer(10);
		}, 2000);
	};
	const endTurns = () => {
		console.log(score);
		console.log(countAnswer);
		// setAnswers(null);
	};

	return (
		<div className="game-board">
			<h1 className="time">{timer}</h1>
			{answers && (
				<Answer
					answers={[answers[0], answers[1], answers[2], answers[3]]}
					handleAnswers={handleAnswers}
				/>
			)}
		</div>
	);
};

export default Game;
