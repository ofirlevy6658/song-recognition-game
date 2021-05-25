import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Menu from "../pages/Menu";
import Game from "../pages/Game";
import Navbar from "./Navbar";
import ScoreBoard from "../pages/ScoreBoard";
import Login from "../pages/Login";
import Genre from "../pages/Genre";
import LeaderBoard from "../pages/LeaderBoard";
import "../styles/app.css";

const App = () => {
	const [user, setUser] = useState(null);

	//after login the function called and set the user data
	const getUser = (user) => {
		setUser(user);
	};
	return (
		<>
			<BrowserRouter>
				{user && <Navbar user={user} />}
				<Switch>
					<Route path="/" exact>
						{localStorage.token ? <Menu getUser={getUser} /> : <Login />}
					</Route>
					<Route path="/scoreboard" exact>
						{user && <ScoreBoard user={user} />}
					</Route>
					<Route path="/genre" exact>
						{user && <Genre user={user} />}
					</Route>
					<Route path="/game" exact>
						{user && <Game genre={user.genre} />}
					</Route>
					<Route path="/leaderboard" exact>
						{<LeaderBoard />}
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
