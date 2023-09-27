import React, { useState } from 'react'
import './WatchlistUpdateModal.css'
import { useDispatch } from 'react-redux'
import { useCustomModal } from '../../context/Modal2';
import { updateExistingWatchlist } from '../../store/watchlists';

function WatchlistUpdateModal({ prevListName, listId }) {
    const { closeModal } = useCustomModal();
    const dispatch = useDispatch();
    const [listName, setListName] = useState(prevListName);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (listName) {

            console.log('LIST NAME: ', listName)
            const data = {
                "name": listName
            }
            await dispatch(updateExistingWatchlist(listId, data));
            closeModal(); // Close the modal after updating
            window.location.reload();
        }
    };


    return (
        <>

            <div id="list-form-container">

                <div id="list-form-heading-container">

                    <div id="list-form-heading">Edit list</div>

                    <span id="close-list-form"
                        className='material-icons close-btn'
                        onClick={closeModal}>close</span>
                </div>

                <form id='actual-form-container' onSubmit={handleSubmit}>
                    <div id="list-errors-div">
                    </div>

                    <input
                        id="list-name-inpt"
                        type="text"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        placeholder="List name..."
                        required
                    />

                    <div id="list-buttons-container">
                        <button id="list-save-btn" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default WatchlistUpdateModal;