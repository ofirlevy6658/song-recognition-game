import { useEffect, useState } from "react";
import Answer from "./Answer";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Game = ({ songs, songsName }) => {
	const [currentSong, setCurrentSong] = useState();
	const [answers, setAnswers] = useState("a", "b", "c", "d");
	const [audio, setAudio] = useState(new Audio());

	useEffect(() => {
		console.log("in use effect");
		random();
	}, []);

	const random = () => {
		const selectedSong = songs[Math.floor(Math.random() * songs.length)];
		setCurrentSong(selectedSong);
		const answers = randomAnswers();
		answers.push(selectedSong.name);
		shuffle(answers);
		setAnswers(answers);
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
	// useEffect(() => {
	// 	if (!currentSong) return setCurrentSong(getRandomSong());
	// 	console.log("song updated -> get answers", currentSong);
	// 	setAnswers(getRandomAnswers());
	// }, [currentSong]);

	// useEffect(() => {
	// 	console.log("got answers -> rerender");
	// }, [answers]);

	function getRandomAnswers() {
		const tempSongNames = songsName.filter(
			(song) => song.name !== currentSong.name
		);
		console.log(tempSongNames);
		const correctAnswerIdx = Math.random() * 4;

		const randomAnswers = [];
		for (let i = 0; i < 4; i++) {
			if (i === correctAnswerIdx) {
				randomAnswers.push(currentSong.name);
			} else {
				randomAnswers.push(
					tempSongNames[Math.floor(Math.random() * tempSongNames.length)]
				);
			}
		}

		console.log(randomAnswers);

		return randomAnswers;
	}

	function getRandomSong() {
		return songs[Math.floor(Math.random() * songs.length)];
	}

	const handleAnswers = () => {
		console.log(currentSong);
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
