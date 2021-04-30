import React, { useState, useEffect } from "react";
import api from "./API/api";

import "./css/app.css";

const App = () => {
	const [player, setPlayer] = useState(new Audio());
	const [startGame, setStartGame] = useState(false);
	const [songs, setSongs] = useState([]);
	useEffect(() => {
		const fetchSongs = async () => {
			const { data } = await api("/song?genere=rock");
			setSongs(data[0].file);
		};
		fetchSongs();
	}, []);

	const clickHandler = () => {
		setStartGame(true);
		const newPlayer = player;
		console.log(songs);
		newPlayer.src = songs;
		setPlayer(newPlayer);
		player.play();
	};

	return (
		<>
			{!startGame && (
				<div className="menu">
					<button onClick={clickHandler}>Start</button>
				</div>
			)}
		</>
	);
};

export default App;
