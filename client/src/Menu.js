import React from "react";
import "./css/menu.css";
import { useHistory } from "react-router-dom";

const Menu = () => {
	let history = useHistory();
	return (
		<div className="menu">
			<button className="menu-selector" onClick={() => history.push("/game")}>
				Play
			</button>
			<button className="menu-selector" onClick={() => history.push("/genre")}>
				Genre
			</button>
			<button className="menu-selector">Score Board</button>
		</div>
	);
};

export default Menu;
