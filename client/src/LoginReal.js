import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/login.css";
import api from "./API/api";

const LoginReal = () => {
	const [singupActive, setSingupActive] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [worngCredentials, setWorngCredentials] = useState("");
	const signupBtn = useRef(null);
	const history = useHistory();

	const login = async (e) => {
		e.preventDefault();
		try {
			const { data } = await api.post("/users/login", {
				password,
				email,
			});
			localStorage.setItem("token", data.user.tokens[0].token);
			history.go(0);
		} catch (e) {
			setWorngCredentials("bad credentials");
		}
	};

	const register = async (e) => {
		e.preventDefault();
		try {
			const { data } = await api.post("/users", {
				name,
				password,
				email,
			});
			localStorage.setItem("token", data.user.tokens[0].token);
			// history.push("/");
			history.go(0);
		} catch (e) {
			console.log(e.response.data); // some reason error message
			const error = e.response.data;
			if (error.includes("password"))
				setWorngCredentials("Weak password, minimum 7 digits");
			else if (error.includes("Email is invalid"))
				setWorngCredentials("Email is invalid");
			else if (error.includes("email_1 dup key"))
				setWorngCredentials("Email already used");
		}
	};

	return (
		<div>
			<div
				ref={signupBtn}
				className={`container ${singupActive}`}
				id="container"
			>
				<div className="form-container sign-up-container">
					<form>
						<h1>Create Account</h1>
						<input
							onChange={(e) => setName(e.currentTarget.value)}
							type="text"
							placeholder="Name"
						/>
						<input
							onChange={(e) => setEmail(e.currentTarget.value)}
							type="email"
							placeholder="Email"
						/>
						<input
							onChange={(e) => setPassword(e.currentTarget.value)}
							type="password"
							placeholder="Password"
						/>
						<button onClick={register}>Sign Up</button>
						<h4 className="wrong-register">{worngCredentials}</h4>
					</form>
				</div>
				<div className="form-container sign-in-container">
					<form>
						<h1>Sign in</h1>
						<input
							type="email"
							placeholder="Email"
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
						<input
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.currentTarget.value)}
						/>
						<button onClick={login}>Sign In</button>
						<h4 className="wrong">{worngCredentials}</h4>
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>
								To keep connected with us please login with your personal info
							</p>
							<button
								className="ghost"
								id="signIn"
								onClick={() => {
									setSingupActive("");
									setWorngCredentials("");
								}}
							>
								Sign In
							</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<button
								className="ghost"
								id="signUp"
								onClick={() => {
									setSingupActive("right-panel-active");
									setWorngCredentials("");
								}}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginReal;
