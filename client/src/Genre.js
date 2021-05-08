import React from "react";
import "./css/genre.css";

const Genre = () => {
	// const [active, setActive] = useState("");
	const genre = ["rock classics", "hip hop"];
	const renderGenre = genre.map((gen) => {
		return (
			<div key={gen}>
				<button className="btn btn-outline-dark genre-btn">{gen}</button>
			</div>
		);
	});
	return (
		<>
			{renderGenre}
			<button className="btn btn-success  genre-btn">save</button>
		</>
	);
};

export default Genre;
