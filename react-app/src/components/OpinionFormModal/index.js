import './OpinionFormModal.css';
import { useCustomModal } from '../../context/Modal2';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOpinion } from '../../store/opinions';

function OpinionFormModal({ ticker }) {
    const dispatch = useDispatch();
    const { closeModal } = useCustomModal();
    const [content, setContent] = useState('');

    const stocksData = useSelector(state => state.stocks.allStocks)
    const allStocks = stocksData ? Object.values(stocksData.stocks) : [];
    const stock = allStocks.find(stock => stock.ticker === ticker)
    const [errors, setErrors] = useState([]);

    const handlePostOpinion = async (e) => {
        e.preventDefault();

        const response = await dispatch(createOpinion(stock.id, content));

        if (response.errors) {
            setErrors(response.errors)
            return console.log("Error creating opinion:");
        } else {
            console.log('Opinion Posted')
            closeModal();
        }
    }

    return (
        <>
            <div id="opinion-form-container">
                <div id="opinion-form-heading-container">
                    <div id="opinion-form-heading">Share Your Opinion</div>
                    <span id="close-list-form"
                        className='material-icons close-btn'
                        onClick={closeModal}>close</span>
                </div>

                <form id='opinion-form' onSubmit={handlePostOpinion}>
                    <div id="opinion-errors-div">
                        {errors.map((error, idx) => <p id="list-error" key={idx}>{error}</p>)}
                    </div>

                    <textarea
                        id="opinion-content-inpt"
                        type="textarea"
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What do you think?..."
                        required
                    />

                    <div id="opinion-buttons-container">
                        <button id="opinion-cancel-btn" onClick={closeModal}>Cancel</button>
                        <button id="opinion-submit-btn" type="submit">Post Opinion</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default OpinionFormModal;