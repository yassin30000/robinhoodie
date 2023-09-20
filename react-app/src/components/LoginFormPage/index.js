import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import '../Navigation/Navigation.css'
import login_image from '../images/login_image.jpeg'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

//randomg comment

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory()
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [demoLogin, setDemoLogin] = useState(false);

	if (sessionUser) return <Redirect to="/" />;
	if (demoLogin) dispatch(login('demo@aa.io', 'password')); // log in as demo user

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) setErrors(data);
	};

	const handleCreateAccount = () => history.push('/signup') // go to sign up page

	return (
		<>
			<div id="login-container">
				<img src={login_image} alt="" className="login-image" />

				<div class="login-form-container">
					<div class="login-form-wrapper">

						<p>Log in to Robinhoodie</p>

						<form onSubmit={handleSubmit}>

							<div id="login-errors-div">
								{errors.map((error, idx) => (
									<p id="login-error" key={idx}>{error}</p>
								))}
							</div>

							<div class="login-label">Email</div>
							<input class="login-input"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<div class="login-label">Password</div>
							<input
								class="login-input"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>

							<div>
								<button class="login-submit-btn" type="submit">Log In</button>
							</div>
							<button type="submit" id="demo-user-login-btn" onClick={() => setDemoLogin(true)}>Log in as demo user</button>

						</form>

						<hr id="line" color="#E3E9ED"></hr>
						<div id="notOnRobin">Not on Robinhoodie? <span onClick={handleCreateAccount}>Create an account</span></div>

					</div>
				</div>
			</div>
		</>
	);
}

export default LoginFormPage;
