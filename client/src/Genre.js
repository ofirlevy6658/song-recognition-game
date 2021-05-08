import { useState } from "react";
import api from "./API/api";
import { useHistory } from "react-router-dom";
import "./css/genre.css";

const Genre = ({ user }) => {
	// const [active, setActive] = useState("");
	const [seleced, setSelect] = useState("rock classics");
	const genres = ["rock classics", "hip hop"];
	const history = useHistory();
	const handleSave = async () => {
		const token = user.tokens[0].token;
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const bodyParameters = {
			genre: seleced,
			id: user._id,
		};
		try {
			await api.patch("/genre", bodyParameters, config);
			history.push("/");
			history.go(0);
		} catch (e) {
			console.log(e);
		}
	};
	const renderGenres = genres.map((genre) => {
		return (
			<div key={genre}>
				<button
					className="btn btn-outline-dark genre-btn"
					onClick={() => setSelect(genre)}
				>
					{genre}
				</button>
			</div>
		);
	});
	return (
		<>
			{renderGenres}
			<button className="btn btn-success  genre-btn" onClick={handleSave}>
				save
			</button>
		</>
	);
};

export default Genre;
