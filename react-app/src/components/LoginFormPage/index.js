import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import '../Navigation/Navigation.css'
import login_image from '../images/login_image.jpeg'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory()
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [loginErrors, setLoginErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false);



	useEffect(() => {
		const errors = {};

		if (!email.length) errors.email = "Email is required."
		if (!password.length) errors.password = 'Password is required.'
		setErrors(errors)

	}, [email, password])

	if (sessionUser) return <Redirect to="/" />;


	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoginErrors([])
		setHasSubmitted(true);

		if (Object.keys(errors).length) {
			return
		}

		const data = await dispatch(login(email, password));
		if (data) {
			setLoginErrors(data)
			setErrors({})
			setHasSubmitted(false);
			return
		}
	};

	const demoUserLogin = (e) => {
		setEmail('demo@aa.io')
		setPassword('appacademy21!')
	}
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
								{loginErrors.map((error, idx) => (
									<p id="login-error" key={idx}>{error}</p>
								))}
							</div>
							<div className='login-section-container'>

								<div className="login-label">Email</div>
								<input className="login-input"
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}

								/>

								{hasSubmitted && errors.email && <p className='errors'>{errors.email}</p>}

							</div>

							<div className='login-section-container'>

								<div className="login-label">Password</div>
								<input
									className="login-input"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}

								/>
								{hasSubmitted && errors.password && <p className='errors'>{errors.password}</p>}

							</div>
							<div>
								<button className={Object.values(errors).length && hasSubmitted? "login-submit-btn-disabled": "login-submit-btn"} type="submit">Log In</button>
							</div>
							<button type="submit" id="demo-user-login-btn" onClick={demoUserLogin}>Log in as demo user</button>

						</form>

						<div id="notOnRobin">Not on Robinhoodie? <span onClick={handleCreateAccount}>Create an account</span></div>

					</div>
					<div className="footer-container-signin-page">
						<div className="footer-wrapper-signin-page">
							<div className="footer-content-signin-page">
								<p className="footer-title-signin-page">Meet The Developers</p>
								<div className="developers-container">
									<div className="developer-content-signin">
										<div className="developers-github">
											<a href='https://github.com/chauchau000' target='_blank'>
												<i className="fa-brands fa-github fa-xl"></i>
											</a>
										</div>
										<div className="developers-name">Adrienne Tran</div>
									</div>
									<div className="developer-content-signin">
										<div className="developers-github">
											<a href='https://github.com/yassin30000' target='_blank'>
												<i className="fa-brands fa-github fa-xl"></i>
											</a>
										</div>
										<div className="developers-name">Yassin Tantawy</div>
									</div>
									<div className="developer-content-signin">
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
