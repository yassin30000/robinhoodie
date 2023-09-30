import React, { useState } from 'react'
import './WatchlistFormModal.css'
import { useDispatch } from 'react-redux'
import { createNewWatchlist, fetchUserWatchlists } from '../../store/watchlists';
import { useCustomModal } from '../../context/Modal2';

function WatchlistFormModal() {
    const { closeModal } = useCustomModal();
    const dispatch = useDispatch();
    const [listName, setListName] = useState('');
    const [errors, setErrors] = useState([]);


    const handleCreateWatchlist = async (e) => {
        e.preventDefault();

        // Validate input data if needed

        const watchlistData = {
            name: listName, // Add other properties as needed
        };

        // Dispatch the action to create a new watchlist
        const data = await dispatch(createNewWatchlist(watchlistData));
        if (data) setErrors(data)
        // Close the modal after creating the watchlist
        await dispatch(fetchUserWatchlists())
        closeModal();
        // window.location.reload();
    };

    return (
        <>

            <div id="list-form-container">

                <div id="list-form-heading-container">

                    <div id="list-form-heading">Create list</div>
                    <span id="close-list-form"
                        className='material-icons close-btn'
                        onClick={closeModal}>close</span>
                </div>

                <form id='actual-form-container' onSubmit={handleCreateWatchlist}>
                    <div id="list-errors-div">
                        {errors.map((error, idx) => <p id="list-error" key={idx}>{error}</p>)}
                    </div>

                    <input
                        id="list-name-inpt"
                        type="text"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        placeholder="List Name"
                        required
                    />

                    <div id="list-buttons-container">
                        <button id="cancel-btn" onClick={closeModal}>Cancel</button>
                        <button id="list-submit-btn" type="submit">Create List</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default WatchlistFormModal;