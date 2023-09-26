import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { CustomModalProvider, CustomModal } from "./context/Modal2";
import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react'

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	window.store = store;
	window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
	return (
		<CustomModalProvider>

			<ModalProvider>
				<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor}>

					<BrowserRouter>
						<App />
						<Modal />
						<CustomModal />
					</BrowserRouter>
				</PersistGate>
				</Provider>

			</ModalProvider>
		</CustomModalProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);