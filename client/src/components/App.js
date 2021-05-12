import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Menu from "./Menu";
import Game from "./Game";
import Navbar from "./Navbar";
import Scoreboard from "./Scoreboard";
import LoginReal from "./LoginReal";
import Genre from "./Genre";
import Leaderboard from "./Leaderboard";
import "./css/app.css";

const App = () => {
	const [user, setUser] = useState(null);
	const getUser = (user) => {
		setUser(user);
	};
	return (
		<>
			<BrowserRouter>
				{user && <Navbar user={user} />}
				<Switch>
					<Route path="/" exact>
						{localStorage.token ? <Menu getUser={getUser} /> : <LoginReal />}
					</Route>
					<Route path="/scoreboard" exact>
						{user && <Scoreboard user={user} />}
					</Route>
					<Route path="/genre" exact>
						{user && <Genre user={user} />}
					</Route>
					<Route path="/game" exact>
						{user && <Game genre={user.genre} />}
					</Route>
					<Route path="/leaderboard" exact>
						{<Leaderboard />}
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
