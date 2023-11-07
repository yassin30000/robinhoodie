import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import signup_image from '../images/signup_image.jpg'
import signup_image_2 from '../images/signup_image_2.jpg'
import signup_image_3 from '../images/signup_image_3.jpg'
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
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSignIn = () => history.push('/login') // go to sign up page

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data)
			}
		} else {
			setErrors(['Confirm Password field must be the same as the Password field']);
		}
	};

	return (
		<>
			<div id="signup-container">
				<img src={signup_image_2} alt="" id="signup-image" />

				<div id="signup-form-container">
					<div id="signup-form-wrapper">

						<p>Creat your login</p>

						<form onSubmit={handleSubmit}>
							<div id="signup-errors-div">
								{errors.map((error, idx) => <p id="signup-error" key={idx}>{error}</p>)}
							</div>

							<div id="signup-label">Email</div>
							<input id="signup-input"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<div id="signup-label">Username</div>
							<input id="signup-input"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>

							<div id="signup-label">Password</div>
							<input id="signup-input"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>

							<div id="signup-label">Confirm Password</div>
							<input id="signup-input"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>

							<div>

								<button type="submit" id="signup-submit-btn">Sign Up</button>
							</div>
						</form >

						<hr id="signup-line" color="#E3E9ED"></hr>
						<div id="already-have-account">Already have an account? <span onClick={handleSignIn}>Log in</span></div>


					</div>
					<div className="footer-container-signin-page">
           				 <div className="footer-wrapper">
                			<div className="footer-content">
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

export default SignupFormPage;
