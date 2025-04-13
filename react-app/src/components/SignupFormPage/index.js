import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import signup_image_2 from '../images/signup_image_2.jpg'
import './SignupForm.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory()
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [signUpErrors, setSignUpErrors] = useState([])
	const [hasSubmitted, setHasSubmitted] = useState(false);

	useEffect(() => {
		const errors = {};
		if (!email.length) errors.email = "Email is required";
		if (!username.length) errors.username = "Username is required"
		if (username.length > 20 || username.length < 6) errors.usernameLength = "Username must be more than 6 characters and less than 20 characters"
		if (!password.length) errors.password = "Password is required";
		if (!confirmPassword.length) errors.confirmPassword = "Confirm password is required";
		if (password !== confirmPassword) errors.passwordMatch = "Password and confirmed passwords must match"

		setErrors(errors)

	}, [email, username, password, confirmPassword])

	if (sessionUser) return <Redirect to="/" />;

	const handleSignIn = () => history.push('/login') // go to sign up page

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true);

		if (Object.keys(errors).length) {
			return
		}

		const data = await dispatch(signUp(username, email, password));
		if (data) {
			setSignUpErrors(data)
			setErrors({})
			setHasSubmitted(false);
			return
		}

	};

	return (
		<>
			<div id="signup-container">
				<div className="signup-image-container">
					<img src={signup_image_2} alt="" id="signup-image" />
				</div>

				<div id="signup-form-container">
					<div id="signup-form-wrapper">

						<p>Create your login</p>

						<form onSubmit={handleSubmit}>
							<div id="signup-errors-div">
								{signUpErrors.map((error, idx) => <p id="signup-error" key={idx}>{error}</p>)}
							</div>

							<div className="signup-section">
								<div id="signup-label">Email</div>
								<input id="signup-input"
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								{hasSubmitted && errors.email && <p className='errors'>{errors.email}</p>}
							</div>

							<div className="signup-section">
								<div id="signup-label">Username</div>
								<input id="signup-input"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
								{hasSubmitted && errors.username && <p className='errors'>{errors.username}</p>}
								{hasSubmitted && errors.usernameLength && <p className='errors'>{errors.usernameLength}</p>}
							</div>

							<div className="signup-section">

								<div id="signup-label">Password</div>
								<input id="signup-input"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								{hasSubmitted && errors.password && <p className='errors'>{errors.password}</p>}
							</div>

							<div className="signup-section">
								<div id="signup-label">Confirm Password</div>
								<input id="signup-input"
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
								{hasSubmitted && errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
								{hasSubmitted && errors.passwordMatch && <p className='errors'>{errors.passwordMatch}</p>}
							</div>

							<div>
								<button type="submit" id={Object.values(errors).length && hasSubmitted ? "signup-submit-btn-disabled" : "signup-submit-btn"}>Sign Up</button>
							</div>
						</form >

						<div id="already-have-account">Already have an account? <span onClick={handleSignIn}>Log in</span></div>


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

export default SignupFormPage;
