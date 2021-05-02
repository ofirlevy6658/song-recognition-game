import React, { useState, useEffect } from "react";
import api from "./API/api";

import Menu from "./Menu";
// import Spinner from "./Spinner";
import "./css/app.css";
// import countDown from "./countdown.mp3";
import Game from "./Game";

const App = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [songs, setSongs] = useState([]);
	const [songsName, setSongsName] = useState([]);
	let collection = "rock classics";

	useEffect(() => {
		const fetchSongs = async () => {
			const { data } = await api(`/song?genere=${collection}`);
			setSongs(data);
			setSongsName(data.map((el) => el.name));
		};
		fetchSongs();
	}, [collection]);

	const handleClick = () => {
		setShowMenu(true);
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
