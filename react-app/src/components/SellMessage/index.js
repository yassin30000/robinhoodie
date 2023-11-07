import { useCustomModal } from '../../context/Modal2';
import './SellMessage.css';

function SellMessage() {

    const { closeModal } = useCustomModal();

    return (
        <>
            <div className="buy-message-container">

                <h1>shares sold successfully</h1>
                <button onClick={closeModal}>close</button>
            </div>
        </>
    )
}

export default SellMessage;