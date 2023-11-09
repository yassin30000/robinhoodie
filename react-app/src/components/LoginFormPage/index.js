import React, { useEffect, useState } from "react";
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

	if (sessionUser) return <Redirect to="/" />;

	const demoUserLogin = (e) => {
		setEmail('demo@aa.io')
		setPassword('appacademy21!')
	  }

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) setErrors(data);
	};

	const handleCreateAccount = () => history.push('/signup') // go to sign up page

	return (
		<>
			<div id="login-container">
				<div className="login-image-container">
					<img src={login_image} alt="" className="login-image" />
				</div>
				<div className="login-form-container">
					<div className="login-form-wrapper">

						<p>Log in to Robinhoodie</p>

						<form onSubmit={handleSubmit}>

							<div id="login-errors-div">
								{errors.map((error, idx) => (
									<p id="login-error" key={idx}>{error}</p>
								))}
							</div>

							<div className="login-label">Email</div>
							<input className="login-input"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<div className="login-label">Password</div>
							<input
								className="login-input"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>

							<div>
								<button className="login-submit-btn" type="submit">Log In</button>
							</div>
							<button type="submit" id="demo-user-login-btn" onClick={demoUserLogin}>Log in as demo user</button>

						</form>

						<div id="notOnRobin">Not on Robinhoodie? <span onClick={handleCreateAccount}>Create an account</span></div>

					</div>
					<div className="footer-container-signin-page">
           				 <div className="footer-wrapper-signin-page">
                			<div className="footer-content-signin-page">
                    			<h1 className="footer-title">Meet The Developers</h1>
                   				 <div className="developers-container">
									<div className="developer-content">
										<div className="developers-github">
											<a href='https://github.com/chauchau000' target='_blank'>
											<i className="fa-brands fa-github fa-xl"></i>
											</a>
										</div>
										<div className="developers-name">Adrienne Tran</div>
									</div>
									<div className="developer-content">
										<div className="developers-github">
											<a href='https://github.com/yassin30000' target='_blank'>
												<i className="fa-brands fa-github fa-xl"></i>
											</a>
										</div>
										<div className="developers-name">Yassin Tantawy</div>
									</div>
									<div className="developer-content">
										<div className="developers-github">
											<a href='https://github.com/Korozami' target='_blank'>
												<i className="fa-brands fa-github fa-xl"></i>
											</a>
										</div>
										<div className="developers-name">Kevin Sy</div>
									</div>
								</div>
                			</div>
            			</div>
      				</div>
				</div>
			</div>
		</>
	);
}

export default LoginFormPage;
