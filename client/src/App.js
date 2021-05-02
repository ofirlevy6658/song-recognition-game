import React, { useState, useEffect } from "react";
import api from "./API/api";

import Menu from "./Menu";
import Spinner from "./Spinner";
import Answer from "./Answer";
import "./css/app.css";
import countDown from "./countdown.mp3";
import Game from "./Game";

const App = () => {
	const [player, setPlayer] = useState(new Audio());
	const [showMenu, setShowMenu] = useState(false);
	const [songs, setSongs] = useState([]);
	const [songsName, setSongsName] = useState([]);
	const [answers, setAnswers] = useState([]);
	let collection = "rock classics";

	useEffect(() => {
		const fetchSongs = async () => {
			const { data } = await api(`/song?genere=${collection}`);
			setSongs(data);
			setSongsName(data.map((el) => el.name));
		};
		fetchSongs();
	}, [collection]);

	// menu
	const handleClick = () => {
		setShowMenu(true);
		randomSong();
		// let newPlayer = player;
		// console.log(songs);
		// newPlayer.src = countDown;
		// newPlayer = setPlayer(countDown);
		// player.play();
	};

	//answers
	const handleAnswers = () => {
		console.log(songs);
		console.log(songsName);
	};
	const randomSong = () => {
		setAnswers([songsName[15], songsName[4], songsName[1], songsName[6]]);
	};

	return (
		<>
			{!showMenu && <Menu handleClick={handleClick} />}
			{/* {showMenu && <Spinner />} */}
			{/* {showMenu && <Answer handleAnswers={handleAnswers} answers={answers} />} */}
			{showMenu && <Game songs={songs} songsName={songsName} />}
		</>
	);
};

export default App;
