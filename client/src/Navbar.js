import React from "react";
import "./css/navbar.css";

const Navbar = ({ user }) => {
	console.log(user);

	return (
		<>
			<ul className="nav justify-content-center">
				<li className="nav-item">
					<p className="nav-link active">Welcome {user.name}</p>
				</li>
				<li className="nav-item">
					<p className="nav-link active">Genre: {user.genre}</p>
				</li>
				<li className="nav-item">
					<p className="nav-link active">
						Best Score: {user.bestScore[user.genre]}
					</p>
				</li>
			</ul>
		</>
	);
};

export default Navbar;
