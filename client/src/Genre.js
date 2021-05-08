import api from "./API/api";
import { useHistory } from "react-router-dom";
import "./css/genre.css";

const Genre = ({ user, handleGenre }) => {
	const genres = ["rock classics", "hip hop"];
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
			await handleGenre(genre);
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
	return <>{renderGenres}</>;
};

export default Genre;
