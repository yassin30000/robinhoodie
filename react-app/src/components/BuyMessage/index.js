import { useCustomModal } from '../../context/Modal2';
import './BuyMessage.css';


function BuyMessage() {

    const { closeModal } = useCustomModal();

    return (
        <>
            <div className="buy-message-container">

                <h1>shares bought successfully</h1>
                <button onClick={closeModal}>close</button>
            </div>
        </>
    )
}

export default BuyMessage;