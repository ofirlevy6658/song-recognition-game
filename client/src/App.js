import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Menu from "./Menu";
import Game from "./Game";
import Navbar from "./Navbar";
import Scoreboard from "./Scoreboard";
import LoginReal from "./LoginReal";
import Genre from "./Genre";
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
						<LoginReal />
					</Route>
					<Route path="/menu" exact>
						<Menu getUser={getUser} />
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

					{/* <Route exact path="/">
						{token ? <Redirect to="/menu" /> : <LoginReal />}
					</Route>
					<Route exact path="/menu">
						{token ? <Menu /> : <Redirect to="/" />}
					</Route> */}
					{/* <Route path="/" exact>
						{token ? <Menu /> : <LoginReal />}
					</Route> */}
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
