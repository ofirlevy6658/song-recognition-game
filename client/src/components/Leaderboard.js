import React, { useEffect, useState } from "react";
import api from "../API/api";
import "./css/leaderboard.css";
const Leaderboard = () => {
	const [scoreData, setScoreData] = useState([]);
	const [genre] = useState([
		"rock classics",
		"hip hop",
		"timeless rock anthems",
		"‎90s Israeli Rock",
	]);

	useEffect(() => {
		const fetchScore = async () => {
			const { data } = await api("/leaderscore");
			setScoreData(data);
			console.log(data);
		};
		fetchScore();
	}, []);

	const renderTable = scoreData.map((user, index) => {
		return (
			<div className="table-container" key={index}>
				<h4>{genre[index]}</h4>
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">name</th>
							<th scope="col">Score</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>{user[4].name}</td>
							<td>{user[4].bestScore[genre[index]]}</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>{user[3].name}</td>
							<td>{user[3].bestScore[genre[index]]}</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>{user[2].name}</td>
							<td>{user[2].bestScore[genre[index]]}</td>
						</tr>
						<tr>
							<th scope="row">4</th>
							<td>{user[1].name}</td>
							<td>{user[1].bestScore[genre[index]]}</td>
						</tr>
						<tr>
							<th scope="row">5</th>
							<td>{user[0].name}</td>
							<td>{user[0].bestScore[genre[index]]}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	});

	return (
		<>
			<h1 className="scoreboard-header">Ranking</h1>
			{renderTable}
		</>
	);
};

export default Leaderboard;
