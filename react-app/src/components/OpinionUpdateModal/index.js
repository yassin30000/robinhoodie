import './OpinionUpdateModal.css'
import { useCustomModal } from '../../context/Modal2';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOpinion } from '../../store/opinions';

function OpinionUpdateModal({ opinionId, prevContent }) {
    const dispatch = useDispatch();
    const { closeModal } = useCustomModal();
    const [content, setContent] = useState(prevContent);

    const [errors, setErrors] = useState([]);

    const handleUpdateOpinion = async () => {
        try {
            await dispatch(updateOpinion(opinionId, content));
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Error updating opinion:", error);
        }
    }

    return (
        <>
            <div id="opinion-form-container">
                <div id="opinion-form-heading-container">
                    <div id="opinion-form-heading">Change Your Opinion</div>
                </div>

                <form id='opinion-form' onSubmit={handleUpdateOpinion}>
                    <div id="opinion-errors-div">
                        {errors.map((error, idx) => <p id="list-error" key={idx}>{error}</p>)}
                    </div>

                    <input
                        id="opinion-content-inpt"
                        type="textarea"
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={prevContent}
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