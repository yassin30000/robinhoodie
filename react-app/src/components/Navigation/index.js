import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import './Navigation.css';
import logo_black from '../images/logo_black.png'
import logo_green from '../images/logo_green.png'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import DropDownModal from '../DropDownModal';

function Navigation() {
	const stocksData = useSelector(state => state.stocks.allStocks);
	const location = useLocation();
	const [dropDownOpen, setDropDownOpen] = useState(false);

	// add link to list where you dont want navbar
	if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404") return null

	return (
		<div id='nav-container'>

			<div id="logo-container">
				<div id="logo-div">
					<NavLink exact to="/">
						<img id="logo-main" src={logo_black} />
						<img id="logo-hover" src={logo_green}></img>
					</NavLink>
				</div>
			</div>


			<SearchBar placeholder="search" data={stocksData} />

			<div id="links-container">
				<span>Rewards</span>
				<span>Investing</span>
				<span>Crypto</span>
				<span>Spending</span>
				<span>Retirement</span>
				<span>Notifications</span>
				<span>
					<OpenModalButton
						buttonText={"Account"}
						modalComponent={<DropDownModal />}
					/>
				</span>
			</div>
		</div>
	);
}

export default Navigation;