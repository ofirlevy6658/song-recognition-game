import React, { useState, useEffect } from "react";
import api from "./API/api";

import Menu from "./Menu";
import Spinner from "./Spinner";
import Answer from "./Answer";
import "./css/app.css";
import countDown from "./countdown.mp3";

const App = () => {
	const [player, setPlayer] = useState(new Audio());
	const [showMenu, setShowMenu] = useState(false);
	const [songs, setSongs] = useState([]);
	useEffect(() => {
		const fetchSongs = async () => {
			const { data } = await api("/song?genere=rock");
			setSongs(data[0].file);
		};
		fetchSongs();
	}, []);

	// menu
	const handleClick = () => {
		setShowMenu(true);
		let newPlayer = player;
		console.log(songs);
		newPlayer.src = countDown;
		newPlayer = setPlayer(countDown);
		// player.play();
	};

	//answers
	const handleAnswers = () => {
		console.log("answer");
	};

	return (
		<>
			{!showMenu && <Menu handleClick={handleClick} />}
			{/* {showMenu && <Spinner />} */}
			{showMenu && <Answer handleAnswers={handleAnswers} />}
		</>
	);
};

export default App;
