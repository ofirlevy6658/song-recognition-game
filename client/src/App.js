import React, { useState, useEffect } from "react";
import api from "./API/api";

const App = () => {
	const [player, setPlayer] = useState(new Audio());
	const [songs, setSongs] = useState([]);
	useEffect(() => {
		const fetchSongs = async () => {
			const { data } = await api("/song?genere=rock");
			setSongs(data[0].file);
		};
		fetchSongs();
	}, []);

	const clickHandler = () => {
		const newPlayer = player;
		console.log(songs);
		newPlayer.src = songs;
		setPlayer(newPlayer);
		player.play();
	};

	return (
		<>
			<h1>
				<button onClick={clickHandler}>Start</button>
			</h1>
		</>
	);
};

export default App;
