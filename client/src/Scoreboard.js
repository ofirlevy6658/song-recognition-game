import React from "react";
import { useLocation, useHistory } from "react-router-dom";

const Scoreboard = () => {
	const location = useLocation();
	const history = useHistory();
	return (
		<>
			<h1>Your Score is {location.state}</h1>
			<button onClick={() => history.push("/menu")}>back</button>
		</>
	);
};

export default Scoreboard;
