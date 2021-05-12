import { useState } from "react";
import api from "../API/api";
import { useHistory, Link } from "react-router-dom";
import "./css/navbar.css";

const Navbar = ({ user }) => {
	const [token] = useState(localStorage.getItem("token"));
	const history = useHistory();
	const logout = async () => {
		try {
			await api.post(
				"/users/logoutall",
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			localStorage.clear();
			history.go(0);
		} catch (e) {
			console.log(e.response);
		}
	};
	return (
		<>
			<ul className="nav justify-content-center">
				<li>
					<Link to="/" className="nav-item">
						<p className="nav-link active" id="home">
							Home
						</p>
					</Link>
				</li>
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
				<li id="log-out" className="nav-item">
					<p className="nav-link active" id="log-out" onClick={logout}>
						Logout
					</p>
				</li>
			</ul>
		</>
	);
};

export default Navbar;
