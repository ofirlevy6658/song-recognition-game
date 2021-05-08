import React, { useEffect } from "react";
import "./css/menu.css";
import { useHistory } from "react-router-dom";

const Menu = ({ handleClick }) => {
	let history = useHistory();
	return (
		<div className="menu">
			<button
				className="btn btn-primary menu-selector"
				onClick={() => history.push("/game")}
			>
				Play
			</button>
			<button className="btn btn-secondary menu-selector">Collections</button>
			<button className="btn btn-secondary menu-selector">Score Board</button>
		</div>
	);
};

export default Menu;
