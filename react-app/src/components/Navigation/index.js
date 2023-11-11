import React, { useEffect, useState, useRef } from 'react';
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
	const accountRef = useRef(null);


	// DARK MODE
	const [theme, setTheme] = useState('light');
	const toggleTheme = () => {
		if (theme === 'light') setTheme('dark');
		else setTheme('light')
	}

	const closeAccount = () => setDropDownOpen(false);


	// useEffect(() => {
	// 	document.body.className = theme;
	// 	document.getElementById('nav-container').className = 'nav-container-' + theme;
	// 	document.body.className = theme;
	// 	document.body.className = theme;
	// }, [theme]);

	useEffect(() => {

        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) closeAccount();
        };
        if (dropDownOpen) window.addEventListener('click', handleClickOutside);


        return () => {
            window.removeEventListener('click', handleClickOutside)
        };


    }, [dropDownOpen])

	// add link to list where you dont want navbar
	if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/portfolio/deposit-funds") return null

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

				{/* <span>
					<button onClick={toggleTheme}>Toggle theme</button>
				</span> */}
				<div id="account-button" ref={accountRef} onClick={() => setDropDownOpen(!dropDownOpen)}>Account</div>
				{dropDownOpen ? <DropDownModal /> : <></>}
				
			</div>
		</div>
	);
}

export default Navigation;
