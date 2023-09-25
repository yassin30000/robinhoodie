import './TransferForm.css'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import { createFunds, addFunds, withdrawFunds, fetchPortfolio } from '../../store/portfolio'


function TransferForm() {
    const dispatch = useDispatch();
    const options = ['Personal Bank', 'Brokerage']
    const [cash, setCash] = useState(0);
    const [from, setFrom] = useState((options[0]));
    const [to, setTo] = useState(options[1]);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const portfolio = useSelector(state => state.portfolio.portfolio)



    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const cashData = {
            cash
        }

        if (from === options[0] && to === options[1]) {
            if(!portfolio) {
                await dispatch(createFunds(cashData))
            } else {
                await dispatch(addFunds(cashData))
            }
        } else if (from === options[1] && to === options[0]) {
            await dispatch(withdrawFunds(cashData))
        } else {
            setErrors("Error")
        }

        if(Object.values(errors).length) {
            return alert('Errors been found')
        };

        // console.log("PORTFOLIOS", portfolio.cash)

        setErrors({})
        setHasSubmitted(false);
        <Redirect to="/" />
    }

    useEffect(() => {
        if (!portfolio) dispatch(fetchPortfolio());
    }, [dispatch, portfolio])

    return (
        <>
            <div className='fund-container'>
                <div className='fund-form-container'>
                    <div className='fund-form-wrapper'>
                        <h2>Transfer money</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='amount-label'>Amount</div>
                            <input className='amount-input'
                                type='number'
                                value={cash}
                                onChange={(e) => setCash(e.target.value)}
                                required
                            />
                            <div className='from-label'>From</div>
                            <select className='from-input'
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}>
                                    {options.map((value) => (
                                        <option value={value} key={value}>
                                            {value}
                                        </option>
                                ))}
                            </select>
                            <div className='to-label'>To</div>
                            <select className='to-input'
                                value={to}
                                onChange={(e) => setTo(e.target.value)}>
                                    {options.map((value) => (
                                        <option value={value} key={value}>
                                            {value}
                                        </option>
                                ))}
                            </select>
                            <div className='frequency-label'>Frequency</div>
                            <select className='frequency-label' value="Just Once">
                                <option value='Just Once'>Just Once</option>
                                <option value='Weekly'>Weekly</option>
                                <option value='Twice a month'>Twice a month</option>
                                <option value='Monthly'>Monthly</option>
                                <option value='Quarterly'>Quarterly</option>
                            </select>
                            <div>
                                <button className='transfer-btn' type='submit'>Transfer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransferForm;
