import React, { useState, useEffect } from "react";
import api from "./API/api";

import Menu from "./Menu";
import Game from "./Game";
import Login from "./Login";
import "./css/app.css";

const App = () => {
	const [user, setUser] = useState(null);
	const [token] = useState(localStorage.getItem("token"));
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
		const fetchUser = async () => {
			try {
				const { data } = await api("/users/me", {
					headers: { Authorization: `Bearer ${token}` },
				});

				setUser(data);
			} catch (e) {
				console.log(e.response);
			}
		};
		if (token) {
			fetchUser();
		}
	}, []);

	const handleClick = () => {
		setShowMenu(true);
	};

	return (
		<>
			{!token && <Login />}
			{token && !showMenu && <Menu handleClick={handleClick} />}
			{token && showMenu && <Game songs={songs} songsName={songsName} />}
			{/* {showMenu && <Answer handleAnswers={handleAnswers} answers={answers} />} */}
		</>
	);
};

export default App;
