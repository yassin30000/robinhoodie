import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useRef } from "react";
import { logout } from "../../store/session";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";

function DropDownModal() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            history.push('/login'); // go to login page when you log out
            closeModal();
        });
    };

    return (
        <div className="dropdown-menu">

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
    )
}

export default DropDownModal;