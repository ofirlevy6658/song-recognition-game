import React from "react";
import "./css/menu.css";

const Menu = ({ handleClick }) => {
	return (
		<div className="menu">
			<button className="btn btn-primary menu-selector" onClick={handleClick}>
				Game
			</button>
			<button className="btn btn-secondary menu-selector">Collections</button>
			<button className="btn btn-secondary menu-selector">Score Board</button>
		</div>
	);
};

export default Menu;
