import React from "react";
import { useDispatch } from "react-redux";
import './ConfirmDeleteOpinion.css'
import { useCustomModal } from '../../context/Modal2';
import { deleteOpinion, fetchOpinions, fetchStockOpinions } from "../../store/opinions";

function ConfirmDeleteOpinion({ opinionId, location, stockId }) {
    const { closeModal } = useCustomModal();

    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            // Dispatch the deleteOpinion action with the opinionId you want to delete
            await dispatch(deleteOpinion(opinionId));
            if (location === 'stock-details') await dispatch(fetchStockOpinions(stockId))
            if (location === 'landing-page') await dispatch(fetchOpinions())
            closeModal(); // Close the modal after successful deletion
            // window.location.reload();
        } catch (error) {
            console.error("Error deleting opinion:", error);
        }
    };

    return (
        <>
            <div id="confirm-delete-container">

                <div id="confirm-delete-heading-container">

                    <div id="confirm-delete-heading">Are you sure you want to delete this opinon?</div>
                    {/* <div id="confirm-delete-close" onClick={closeModal}>X</div> */}
                    <span id="confirm-delete-close"
                        className='material-icons close-btn'
                        onClick={closeModal}>close</span>
                </div>

                <div id="confirm-delete-subheading-container">
                    <div id="confirm-delete-subheading">
                        If you delete this, it'll be gone forever!
                    </div>
                </div>

                <button id='confirm-delete-btn' onClick={handleDelete}>Delete Opinion</button>
            </div>
        </>
    )
}

export default ConfirmDeleteOpinion;