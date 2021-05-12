import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../API/api";
import "./css/menu.css";

const Menu = ({ getUser }) => {
	const [token] = useState(localStorage.getItem("token"));

	let history = useHistory();
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await api("/users/me", {
					headers: { Authorization: `Bearer ${token}` },
				});
				// setUser(data);
				getUser(data);
			} catch (e) {
				console.log(e.response);
			}
		};
		if (token) {
			fetchUser();
		}
	}, [token]);
	return (
		<div className="menu">
			<button className="menu-selector" onClick={() => history.push("/game")}>
				Play
			</button>
			<button className="menu-selector" onClick={() => history.push("/genre")}>
				Genre
			</button>
			<button
				className="menu-selector"
				onClick={() => history.push("/leaderboard")}
			>
				Leader board
			</button>
		</div>
	);
};

export default Menu;
