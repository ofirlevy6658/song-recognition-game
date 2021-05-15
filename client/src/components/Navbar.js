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
				{ token },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
		} catch (e) {
			console.log(e.response);
		}
		localStorage.clear();
		history.go(0);
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
					<p className="nav-link active hide">
						Welcome {user ? user.name : ""}
					</p>
				</li>
				<li className="nav-item">
					<p className="nav-link active hide">
						Genre: {user ? user.genre : ""}
					</p>
				</li>
				<li className="nav-item">
					<p className="nav-link active">
						Best Score: {user ? user.bestScore[user.genre] : ""}
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
