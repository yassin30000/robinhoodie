import { useSelector } from 'react-redux';
import '../404Page/404Page.css'
import image404 from '../images/not_found.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Page404() {

    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const handleHome = () => {
        return history.push('/')
    }

    return (

        <>
            <div id='page-container'>

                <div id='left-div'>
                    <div id='title'>404 <br />page not found.</div>
                    <div id='subtitle'>Not all those who wander are lost, but it seems you may have taken a wrong turn.</div>
                    <div id='home-btn' onClick={handleHome}>go home</div>
                </div>

                <div id='right-div'>
                    <img src={image404} />
                </div>

            </div>
        </>
    )
}

export default Page404