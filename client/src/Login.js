import { useRef, useState } from "react";
import "./css/login.css";
import api from "./API/api";

const Login = () => {
	const [singupActive, setSingupActive] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [worngCredentials, setWorngCredentials] = useState("");
	const signupBtn = useRef(null);

	const login = async (e) => {
		e.preventDefault();
		try {
			const { data } = await api.post("/users/login", {
				password,
				email,
			});
			localStorage.setItem("user", data);
		} catch (e) {
			setWorngCredentials("bad credentials");
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
						<div className="social-container"></div>
						<input type="text" placeholder="Name" />
						<input type="email" placeholder="Email" />
						<input type="password" placeholder="Password" />
						<button>Sign Up</button>
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
								onClick={() => setSingupActive("")}
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
								onClick={() => setSingupActive("right-panel-active")}
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
