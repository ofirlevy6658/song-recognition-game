import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../API/api";
import Answer from "./Answer";
import correctSound from "../Audio/correct.mp3";
import incorrect from "../Audio/incorrect.mp3";
import countDown from "../Audio/countdown2.mp3";
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
	const [disableBtn, setDisableBtn] = useState(true);

	const history = useHistory();
	let tic;

	useEffect(() => {
		const fetchSongs = async () => {
			player.volume = 0.45;
			player.play();
			const { data } = await api(`/song?genere=${genre}`);
			setSongs(await data);
			setSongsName(await data.map((el) => el.name));
		};
		fetchSongs();
		// clean up function
		return () => {
			player.pause();
		};
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
				setTimer(11);
				setCountAnswer(countAnswer + 1);
				return;
			}
			incorrectAnswer();
		}
	}, [timer]);

	const startGame = () => {
		setTimeout(() => {
			setDisableBtn(false);
		}, 1000);
		const selectedSongIndex = Math.floor(Math.random() * songs.length);
		const selectedSong = songs[selectedSongIndex];
		songs.splice(selectedSongIndex, 1);
		setCurrentSong(selectedSong);
		const answers = randomAnswers();
		answers.push(selectedSong.name);
		shuffle(answers);
		setAnswers(answers);
		const newPlayer = player;
		player.volume = 0.35;
		newPlayer.src = selectedSong.file;
		setPlayer(newPlayer);
		player.play();
	};

	const randomAnswers = () => {
		const randomUnique = [];
		while (randomUnique.length < 3) {
			let r = Math.floor(Math.random() * songs.length);
			if (randomUnique.indexOf(r) === -1) randomUnique.push(r);
		}
		return [
			songs[randomUnique[0]].name,
			songs[randomUnique[1]].name,
			songs[randomUnique[2]].name,
		];
	};

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	const handleAnswers = (e) => {
		setDisableBtn(true);
		clearTimeout(tic);
		player.pause();
		if (currentSong.name.toLowerCase() === e.target.innerText.toLowerCase()) {
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
			setTimer(11);
		}, 1500);
	};
	const incorrectAnswer = () => {
		const newPlayer = player;
		newPlayer.src = incorrect;
		setPlayer(newPlayer);
		player.play();
		setTimeout(() => {
			setCountAnswer(countAnswer + 1);
			setTimer(11);
		}, 1500);
	};

	return (
		<div className="game-board">
			<h1 className="time">{timer}</h1>
			{answers && (
				<Answer
					btnState={disableBtn}
					answers={[answers[0], answers[1], answers[2], answers[3]]}
					handleAnswers={handleAnswers}
				/>
			)}
		</div>
	);
};

export default Game;
