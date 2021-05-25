import api from "../API/api";
import { useHistory } from "react-router-dom";
import "../styles/genre.css";

const Genre = ({ user }) => {
	const genres = [
		"rock classics",
		"hip hop",
		"timeless rock anthems",
		"‎90s Israeli Rock",
	];
	const history = useHistory();

	const handleSave = async (genre) => {
		const token = user.tokens[0].token;
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const bodyParameters = {
			genre,
			id: user._id,
		};
		try {
			await api.patch("/genre", bodyParameters, config);
			history.push("/");
		} catch (e) {
			console.log(e);
		}
	};
	const renderGenres = genres.map((genre) => {
		return (
			<div key={genre}>
				<button
					className="btn btn-outline-dark genre-btn"
					onClick={() => handleSave(genre)}
				>
					{genre}
				</button>
			</div>
		);
	});
	return <div className="genre-btns">{renderGenres}</div>;
};

export default Genre;
