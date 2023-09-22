import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar/SearchBar';
import './Navigation.css';
import { logout } from '../../store/session';
import logo_black from '../images/logo_black.png'
import logo_green from '../images/logo_green.png'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const stocksData = useSelector(state => state.stocks.allStocks);

	const location = useLocation();
	const history = useHistory();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	// const [search, setSearch] = useState('')
	// const [searchModal, setSearchModal] = useState(false)
	// const searchRef = useRef(null);


	const closeDropdown = () => setIsDropdownOpen(false);

	const handleLogout = () => {
		closeDropdown();
		dispatch(logout()).then(() => {
			history.push('/login'); // go to login page when you log out
		});
	};


	useEffect(() => {

		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) closeDropdown();
		};
		if (isDropdownOpen) window.addEventListener('click', handleClickOutside);

		// const closeSearch = (event) => {
		// 	if (searchRef.current && !searchRef.current.contains(event.target)) setSearchModal(false);

		// }
		// if (searchModal) window.addEventListener('click', closeSearch);

		return () => {
			window.removeEventListener('click', handleClickOutside)
			// window.removeEventListener('click', closeSearch)
		};


	}, [isDropdownOpen,
		// searchModal,
		sessionUser]);


	if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404") return null // dont show navbar on login page

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

			{/* <div id="search-bar-container"  ref={searchRef} onClick={() => setSearchModal(true)}>
				<input type="search" 
					placeholder="Search" 
					onChange={(e) => setSearch(e.target.value)}
				/>
				{searchModal && <SearchBar placeholder="search" data={stocksData}/>} 
			</div> */}

			<SearchBar placeholder="search" data={stocksData} />

			<div id="links-container">
				<span>Rewards</span>
				<span>Investing</span>
				<span>Crypto</span>
				<span>Spending</span>
				<span>Retirement</span>
				<span>Notifications</span>
				<span
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className={isDropdownOpen ? 'active-account-link' : 'account-link'}
				>
					Account
				</span>
				{isDropdownOpen && (
					<div className="dropdown-menu" ref={dropdownRef}>

						{sessionUser && (<p className='user-name'>{sessionUser.username}</p>)} {/* if logged in, show username */}

						<NavLink to="/">Robinhood Gold</NavLink>
						<NavLink to="/">Profile</NavLink>
						<NavLink to="/">Investing</NavLink>
						<NavLink to="/">Crypto</NavLink>
						<NavLink to="/">Transfers</NavLink>
						<NavLink to="/">Recurring</NavLink>
						<NavLink to="/">Reports and statements</NavLink>
						<NavLink to="/">History</NavLink>
						<NavLink to="/">Settings</NavLink>
						<NavLink to="/">Help</NavLink>
						<button onClick={handleLogout}>Log Out</button>
					</div>
				)}
			</div>


			{/* <ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul> */}
		</div>
	);
}

export default Navigation;