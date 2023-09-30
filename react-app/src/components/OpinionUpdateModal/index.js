import './OpinionUpdateModal.css'
import { useCustomModal } from '../../context/Modal2';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateOpinion, fetchOpinions, fetchStockOpinions } from '../../store/opinions';

function OpinionUpdateModal({ opinionId, prevContent, location, stockId }) {
    const dispatch = useDispatch();
    const { closeModal } = useCustomModal();
    const [content, setContent] = useState(prevContent);
    const [errors, setErrors] = useState([]);

    const handleUpdateOpinion = async (e) => {
        e.preventDefault();
        // console.log('hello1')
        const response = await dispatch(updateOpinion(opinionId, content));

        if (response.errors) {
            setErrors(response.errors)
            console.error("Error updating opinion:");
        } else {

            if (location === 'stock-details') await dispatch(fetchStockOpinions(stockId))
            if (location === 'landing-page') await dispatch(fetchOpinions())
            closeModal();
        }

    }


    return (
        <>
            <div id="opinion-form-container">
                <div id="opinion-form-heading-container">
                    <div id="opinion-form-heading">Change Your Opinion</div>
                    <span id="close-list-form"
                        className='material-icons close-btn'
                        onClick={closeModal}>close</span>
                </div>

                <form id='opinion-form' onSubmit={handleUpdateOpinion}>
                    <div id="opinion-errors-div">
                        {errors.map((error, idx) => <p id="list-error" key={idx}>{error}</p>)}
                    </div>

                    <textarea
                        id="opinion-content-inpt"
                        type="textarea"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        placeholder='Change your opinion...'
                        required
                    />

                    <div id="opinion-buttons-container">
                        <button id="opinion-cancel-btn" onClick={closeModal}>Cancel</button>
                        <button id="opinion-submit-btn" type="submit">Change Opinion</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default OpinionUpdateModal;