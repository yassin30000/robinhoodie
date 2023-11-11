
import { logout } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { logoutPortfolio } from "../../store/portfolio";

function DropDownModal() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleLogout = () => {
        dispatch(logoutPortfolio())
        dispatch(logout()).then(() => {
            history.push('/login'); // go to login page when you log out
            closeModal();
        });
    };

    return (
        <div className="dropdown-menu">

            {sessionUser && (<p className='user-name'>{sessionUser.username}</p>)} {/* if logged in, show username */}
            <Link to='/'>Home</Link>
            <button onClick={handleLogout}>
                <span className="material-icons logout">logout</span>
                Log Out</button>
        </div>
    )
}

export default DropDownModal;