import React, { useState, useEffect } from "react";
import api from "./API/api";

import Menu from "./Menu";
import Game from "./Game";
import Login from "./Login";
import "./css/app.css";

const App = () => {
	const [isLoggedin, setIsLogged] = useState(false);
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
		console.log(localStorage);
		fetchSongs();
	}, [collection]);

	const handleClick = () => {
		setShowMenu(true);
	};

	return (
		<>
			{!isLoggedin && <Login handleLogin={handleLogin} />}
			{/* {!showMenu && <Menu handleClick={handleClick} />} */}
			{/* {showMenu && <Game songs={songs} songsName={songsName} />} */}
			{/* {showMenu && <Answer handleAnswers={handleAnswers} answers={answers} />} */}
		</>
	);
};

export default App;
