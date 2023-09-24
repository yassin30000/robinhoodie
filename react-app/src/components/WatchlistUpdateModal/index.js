import React, { useState } from 'react'
import './WatchlistUpdateModal.css'
import { useDispatch } from 'react-redux'
import { createNewWatchlist } from '../../store/watchlists';
import { useCustomModal } from '../../context/Modal2';
import { updateExistingWatchlist } from '../../store/watchlists';

function WatchlistUpdateModal({ prevListName, listId }) {
    const { closeModal } = useCustomModal();
    const dispatch = useDispatch();
    const [listName, setListName] = useState('');
    const [errors, setErrors] = useState([]);

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
                    <div id="close-list-form" onClick={closeModal}>

                    </div>
                    <span id="close-list-form"
                        className='material-icons close-btn'
                        onClick={closeModal}>close</span>
                </div>

                <form id='actual-form-container' onSubmit={handleSubmit}>
                    <div id="list-errors-div">
                        {errors.map((error, idx) => <p id="list-error" key={idx}>{error}</p>)}
                    </div>

                    <input
                        id="list-name-inpt"
                        type="text"
                        // value={prevListName}
                        onChange={(e) => setListName(e.target.value)}
                        placeholder={prevListName}
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