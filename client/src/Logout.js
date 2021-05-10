import { useEffect, useState } from "react";
import api from "./API/api";
import { useHistory } from "react-router-dom";

const Logout = () => {
	const [token] = useState(localStorage.getItem("token"));
	useEffect(() => {
		const logoutUser = async () => {
			try {
				await api.post("/users/logoutAll", {
					headers: { Authorization: `Bearer ${token}` },
				});
				console.log("work");
			} catch (e) {
				console.log(e);
			}
		};
		console.log("in log out");
	});
	return <></>;
};

export default Logout;
