import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import StockDetails from "./components/StockDetails/StockDetails";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import TransferForm from "./components/TransferFundForm/TransferForm";
import LandingPage from "./components/LandingPage/LandingPage";
import Page404 from './components/404Page/index'
import Portfolio from "./components/Portfolio/Portfolio";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (

		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/login" >
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>					

					<Route path="/stocks/:ticker">
						<StockDetails />
					</Route>
					<Route path="/portfolio/deposit-funds">
						<TransferForm />
					</Route>
					<Route exact path="/">
						<LandingPage />
					</Route>
					<Route path="/">
						<Page404 />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;

// random comment
