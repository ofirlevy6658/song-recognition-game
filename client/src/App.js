import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import api from "./API/api";

import Menu from "./Menu";
import Game from "./Game";
import Login from "./Login";
import "./css/app.css";

const App = () => {
	const [userToken, setUserToken] = useState(null);
	const [userIsLogged, setUserIsLogged] = useState(false);
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

	//check if user logged in
	useEffect(() => {
		const loggedInUser = localStorage.getItem("token");
		if (loggedInUser) {
			setUserToken(loggedInUser);
			setUserIsLogged(true);
		}
	}, []);

	const handleClick = () => {
		setShowMenu(true);
	};

	return (
		<>
			{!userIsLogged && <Login />}
			{userIsLogged && !showMenu && <Menu handleClick={handleClick} />}
			{userIsLogged && showMenu && <Game songs={songs} songsName={songsName} />}
			{/* {showMenu && <Answer handleAnswers={handleAnswers} answers={answers} />} */}
		</>
	);
};

export default App;
