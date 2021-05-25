import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../API/api";
import "../styles/login.css";

const Login = () => {
	const [signupActive, setSignupActive] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [wrongCredentials, setWrongCredentials] = useState("");
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
			setWrongCredentials("bad credentials");
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
			history.go(0);
		} catch (e) {
			const error = e.response.data;
			if (error.includes("password"))
				setWrongCredentials("Weak password, minimum 7 digits");
			else if (error.includes("Email is invalid"))
				setWrongCredentials("Email is invalid");
			else if (error.includes("email_1 dup key"))
				setWrongCredentials("Email already used");
		}
	};

	return (
		<div>
			<div
				ref={signupBtn}
				className={`container ${signupActive}`}
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
						<h4 className="wrong-register">{wrongCredentials}</h4>
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
						<h4 className="wrong">{wrongCredentials}</h4>
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>Please login</p>
							<button
								className="ghost"
								id="signIn"
								onClick={() => {
									setSignupActive("");
									setWrongCredentials("");
								}}
							>
								Sign In
							</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Register</h1>
							<p>Enter your personal details</p>
							<button
								className="ghost"
								id="signUp"
								onClick={() => {
									setSignupActive("right-panel-active");
									setWrongCredentials("");
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

export default Login;
