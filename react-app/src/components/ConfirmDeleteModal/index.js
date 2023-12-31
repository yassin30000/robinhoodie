import React from "react";
import { useDispatch } from "react-redux";
import { deleteExistingWatchlist, fetchUserWatchlists } from "../../store/watchlists";
import './ConfirmDeleteModal.css'
import { useCustomModal } from '../../context/Modal2';


function ConfirmDeleteModal({ listName, listTotal, listId }) {
    const { closeModal } = useCustomModal();

    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteExistingWatchlist(listId))
        await dispatch(fetchUserWatchlists())
        // return window.location.reload();
        closeModal();
    }

    return (
        <>
            <div id="confirm-delete-container">

                <div id="confirm-delete-heading-container">

                    <div id="confirm-delete-heading">Are you sure you want to delete <br />"{listName}"?</div>
                    {/* <div id="confirm-delete-close" onClick={closeModal}>X</div> */}
                    <span id="confirm-delete-close"
                        className='material-icons close-btn'
                        onClick={closeModal}>close</span>
                </div>

                <div id="confirm-delete-subheading-container">
                    <div id="confirm-delete-subheading">
                        If you delete this list and its {listTotal} items, it'll be gone forever!
                    </div>
                </div>

                <button id='confirm-delete-btn' onClick={handleDelete}>Delete {listName}</button>
            </div>
        </>
    )
}

export default ConfirmDeleteModal;