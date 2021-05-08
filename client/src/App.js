import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Menu from "./Menu";
import Game from "./Game";
import Navbar from "./Navbar";
import Scoreboard from "./Scoreboard";
import LoginReal from "./LoginReal";
import api from "./API/api";
import Genre from "./Genre";
import "./css/app.css";

const App = () => {
	const [user, setUser] = useState(null);
	const [genre, setGenre] = useState("");
	const [token] = useState(localStorage.getItem("token"));

	//check if user logged in
	useEffect(() => {
		console.log("in");
		const fetchUser = async () => {
			try {
				const { data } = await api("/users/me", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUser(data);
				console.log(data);
			} catch (e) {
				console.log(e.response);
			}
		};
		if (token) {
			fetchUser();
		}
	}, [token, genre]);

	const handleGenre = async (newGenre) => {
		setGenre(await newGenre);
	};
	return (
		<>
			<BrowserRouter>
				{user && <Navbar />}
				<Switch>
					<Route exact path="/">
						{token ? <Redirect to="/menu" /> : <LoginReal />}
					</Route>
					<Route exact path="/menu">
						{token ? <Menu /> : <Redirect to="/" />}
					</Route>
					<Route path="/scoreboard" exact>
						<Scoreboard />
					</Route>
					<Route path="/Genre" exact>
						{user && <Genre user={user} handleGenre={handleGenre} />}
					</Route>
					<Route path="/game" exact>
						{user && <Game genre={user.genre} />}
					</Route>
				</Switch>
			</BrowserRouter>
			{/* <Route
					exact
					path="/"
					component={() => (token ? null : <LoginReal />)}
				/> */}
			{/* 
				<Route path="/" exact>
				<LoginReal />
			</Route> */}
			{/* {!token && <Login />} */}
			{/* {token && !showMenu && <Menu handleClick={handleClick} />} */}
			{/* {token && showMenu && <Game songs={songs} songsName={songsName} />} */}
			{/* {showMenu && <Answer handleAnswers={handleAnswers} answers={answers} />} */}
		</>
	);
};

export default App;
