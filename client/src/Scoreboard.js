import React, { useEffect } from "react";
import api from "./API/api";
import { useLocation, useHistory } from "react-router-dom";

const Scoreboard = ({ user }) => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const token = user.tokens[0].token;
		const updateScore = async () => {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			const bodyParameters = {
				genre: user.genre,
				id: user._id,
				score: location.state,
			};

			try {
				await api.patch("/bestscore", bodyParameters, config);
				console.log("did");
			} catch (e) {
				console.log(e.response);
			}
		};
		if (location.state > user.bestScore[user.genre]) updateScore();
	}, []);
	return (
		<>
			<h1>Your Score is {location.state}</h1>
			<button onClick={() => history.push("/")}>back</button>
		</>
	);
};

export default Scoreboard;
