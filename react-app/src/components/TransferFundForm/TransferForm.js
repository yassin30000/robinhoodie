import './TransferForm.css'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createFunds, addFunds, withdrawFunds, fetchPortfolio } from '../../store/portfolio'


function TransferForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const options = ['Personal Bank', 'Brokerage']
    const [cash, setCash] = useState(0);
    const [from, setFrom] = useState((options[0]));
    const [to, setTo] = useState(options[1]);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const portfolio = useSelector(state => state.portfolio.portfolio)
    
    const hasPorfolio = () => {
        if (portfolio.message === 'User does not have a portfolio') {
            return false
        } else {
            return true
        }
    }

    console.log('PORFOLIO', portfolio)

    useEffect(() => {
        const errors  = {};

        if(!cash) {
            errors.cash = "Cash amount is required";
        };

        if(cash < 0) {
            errors.cash = "Cash amount can not be negative";
        };

        if(from === to) {
            errors.from = "Can't transfer money into the same location"
        }

        setErrors(errors)
    }, [cash, from, to])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if(Object.values(errors).length) {
            return alert("Error please fix the underlying problems")
        };

        const cashData = {
            cash
        }
        if (from === options[0] && to === options[1]) {
            if (!hasPorfolio()) {
                await dispatch(createFunds(cashData))
            } else {
                await dispatch(addFunds(cashData))
            }
        } else if (from === options[1] && to === options[0]) {
            await dispatch(withdrawFunds(cashData))
        } else {
            setErrors("Error")
        }

        // console.log("PORTFOLIOS", portfolio.cash)
        history.push('/')
        setErrors({})
        setHasSubmitted(false);
    }

    useEffect(() => {
        if (!hasPorfolio) dispatch(fetchPortfolio());
    }, [dispatch, portfolio])

    return (
        <>
            <div className='fund-container'>
                <div className='fund-form-container'>
                    <div className='fund-form-wrapper'>
                        <h2>Transfer money</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='section'>
                                <label className='label-tag'>Amount</label>
                                <input className='input-tag-one'
                                    type='number'
                                    placeholder='$0.00'
                                    onChange={(e) => setCash(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='error-blocks'>
                                {errors.cash && (<p className="error">*{errors.cash}</p>) }
                            </div>
                            <div className='section'>
                                <label className='label-tag'>From</label>
                                <select className='input-tag-two'
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}>
                                        {options.map((value) => (
                                            <option value={value} key={value}>
                                                {value}
                                            </option>
                                    ))}
                                </select>
                            </div>
                            <div className='error-blocks'>
                                {errors.from && (<p className="error">*{errors.from}</p>) }
                            </div>
                            <div className='section'>
                                <label className='label-tag'>To</label>
                                <select className='input-tag-two'
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}>
                                        {options.map((value) => (
                                            <option value={value} key={value}>
                                                {value}
                                            </option>
                                    ))}
                                </select>
                            </div>
                            <div className='error-blocks'>
                                {errors.from && (<p className="error">*{errors.from}</p>) }
                            </div>
                            {/* <div className='section'>
                                 <label className='label-tag'>Frequency</label>
                                <select className='input-tag-two' value="Just Once">
                                    <option value='Just Once'>Just Once</option>
                                    <option value='Weekly'>Weekly</option>
                                    <option value='Twice a month'>Twice a month</option>
                                    <option value='Monthly'>Monthly</option>
                                    <option value='Quarterly'>Quarterly</option>
                                </select>
                            </div> */}
                            <div className='small-txt'>
                                <div className='text'>
                                    Daily deposit limit: $50,000
                                </div>
                            </div>
                            <div className='submit-btn'>
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
