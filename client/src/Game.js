import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./API/api";
import Answer from "./Answer";
import correctSound from "./correct.mp3";
import incorrect from "./incorrect.mp3";
import countDown from "./countdown2.mp3";

import "./css/game.css";
const Game = ({ genre }) => {
	const [songs, setSongs] = useState([]);
	const [songsName, setSongsName] = useState(null);
	const [currentSong, setCurrentSong] = useState();
	const [answers, setAnswers] = useState();
	const [player, setPlayer] = useState(new Audio(countDown));
	const [countAnswer, setCountAnswer] = useState(0);
	const [timer, setTimer] = useState(5);
	const [score, setScore] = useState(0);
	const history = useHistory();
	let tic;
	useEffect(() => {
		const fetchSongs = async () => {
			player.volume = 0.45;
			player.play();
			const { data } = await api(`/song?genere=${genre}`);
			console.log(data);
			setSongs(await data);
			setSongsName(await data.map((el) => el.name));
		};
		fetchSongs();
	}, [genre, player]);

	useEffect(() => {
		if (countAnswer === 6) {
			history.push("/scoreboard", [score]);
		} else {
			if (!countAnswer) return;
			startGame();
		}
	}, [countAnswer, history]);

	useEffect(() => {
		if (timer !== 0) {
			tic = setTimeout(() => {
				setTimer(timer - 1);
			}, 1000);
		} else {
			if (!countAnswer) {
				setCountAnswer(countAnswer + 1);
				return;
			}
			incorrectAnswer();
		}
	}, [timer]);

	const startGame = () => {
		const selectedSong = songs[Math.floor(Math.random() * songs.length)];
		setCurrentSong(selectedSong);
		const answers = randomAnswers();
		answers.push(selectedSong.name);
		console.log(selectedSong.name);
		shuffle(answers);
		setAnswers(answers);
		const newPlayer = player;
		player.volume = 0.35;
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
		console.log(score);
		setScore(score + timer);
		const newPlayer = player;
		newPlayer.src = correctSound;
		setPlayer(newPlayer);
		player.play();
		setTimeout(() => {
			setCountAnswer(countAnswer + 1);
			setTimer(10);
		}, 1500);
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
		}, 1500);
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
