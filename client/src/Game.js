import { useEffect, useState } from "react";
import Answer from "./Answer";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Game = ({ songs, songsName }) => {
	const [currentSong, setCurrentSong] = useState();
	const [answers, setAnswers] = useState();
	const [player, setPlayer] = useState(new Audio());
	const [countAnswer, setCountAnswer] = useState(0);

	useEffect(() => {
		console.log("in use effect");
		random();
	}, [countAnswer]);

	const random = () => {
		const selectedSong = songs[Math.floor(Math.random() * songs.length)];
		setCurrentSong(selectedSong);
		const answers = randomAnswers();
		answers.push(selectedSong.name);
		shuffle(answers);
		setAnswers(answers);
		// playSong();
		const newPlayer = player;
		newPlayer.src = selectedSong.file;
		setPlayer(newPlayer);
		player.play();
	};

	const playSong = () => {
		const player = new Audio();
		console.log(currentSong);
		player.src = currentSong.file;
		// player.play();
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
			(SONG: {currentSong?.name})
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
