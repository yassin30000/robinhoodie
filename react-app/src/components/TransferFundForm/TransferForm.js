import './TransferForm.css'
import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { createFunds, addFunds, withdrawFunds, fetchPortfolio } from '../../store/portfolio'


function TransferForm() {
    const dispatch = useDispatch();
    const options = ['Personal Bank', 'Brokerage']
    const [cash, setCash] = useState(0);
    const [from, setFrom] = useState((options[0]));
    const [to, setTo] = useState(options[1]);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if(Object.values(errors).length) {
            return alert('Errors been found')
        };

        const cashData = {
            cash
        }

        if (from === options[0] && to === options[1]) {
            let newFund = await dispatch()
        }
    }

    return (
        <>
            <div className='fund-container'>

            </div>
        </>
    )
}
