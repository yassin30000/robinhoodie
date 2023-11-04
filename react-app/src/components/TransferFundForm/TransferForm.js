import './TransferForm.css'
import React, { useState, useEffect, useCallback } from 'react'
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
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const [buttonText, setButtonText] = useState('Withdraw')

    const hasPorfolio = useCallback(() => {
        if (portfolio.message === 'User does not have a portfolio') {
            return false
        } else {
            return true
        }
    }, [portfolio])


    const handleOptionOne = (e) => {
        setFrom(e.target.value)
        if (e.target.value === options[0]) setTo(options[1]);
        if (e.target.value === options[1]) setTo(options[0]);
    }

    const handleOptionTwo = (e) => {
        setTo(e.target.value)
        if (e.target.value === options[0]) setFrom(options[1]);
        if (e.target.value === options[1]) setFrom(options[0]);
    }

    useEffect(() => {
        const errors = {};

        if (from === options[0] && to === options[1]) setButtonText('Deposit')
        if (from === options[1] && to === options[0]) setButtonText('Withdraw')

        if (cash < 0) {
            errors.cash = "Cash amount can not be negative";
        };

        if (from === to) {
            errors.from = "Can't transfer money into the same location"
        }

        setErrors(errors)
    }, [cash, from, to, setFrom, setTo])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) {
            return alert("Error please fix the underlying problems")
        };

        const cashData = {
            cash
        }
        if (from === options[0] && to === options[1]) {
            if (!hasPorfolio()) {
                if (cash === "0") {
                    return alert("Cash amount is required");
                };
                await dispatch(createFunds(cashData))
            } else {
                if (cash === "0") {
                    return alert("Cash amount is required");
                };
                await dispatch(addFunds(cashData))
            }
        } else if (from === options[1] && to === options[0]) {
            if (portfolio?.cash < cash) {
                return alert("Sorry you don't have enough cash to withdraw")
            }
            if (cash === "0") {
                return alert("Cash amount is required");
            };
            await dispatch(withdrawFunds(cashData))
        } else {
            setErrors("Error")
        }

        history.push('/')
        setErrors({})
    }

    const closeFormBtn = () => {
        history.push('/')
    }

    useEffect(() => {
        if (!hasPorfolio) dispatch(fetchPortfolio());
    }, [dispatch, portfolio, hasPorfolio])

    return (
        <>
            <div className='close-transfer-container'>
                <div id='close-transfer-container'>

                    <span id="close-transfer-form"
                        className='material-icons close-btn'
                        onClick={closeFormBtn}
                    >close
                    </span>
                </div>
            </div>
            <div className='fund-container'>
                <div className='fund-form-wrapper'>
                    <div id='transfer-money-heading'>Transfer money</div>
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
                            {errors.cash && (<p className="error">*{errors.cash}</p>)}
                        </div>
                        <div className='section'>
                            <label className='label-tag'>From</label>
                            <select className='input-tag-two'
                                value={from}
                                onChange={handleOptionOne}>
                                {options.map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='error-blocks'>
                            {errors.from && (<p className="error">*{errors.from}</p>)}
                        </div>
                        <div className='section'>
                            <label className='label-tag'>To</label>
                            <select className='input-tag-two'
                                value={to}
                                onChange={handleOptionTwo}>
                                {options.map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='error-blocks'>
                            {errors.from && (<p className="error">*{errors.from}</p>)}
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
                                Current cash: ${portfolio?.cash ? portfolio?.cash?.toLocaleString() : 0}
                                {/* Daily deposit limit: $50,000 */}
                            </div>
                        </div>
                        <div className='transfer-funds-button-container'>
                            <button className='transfer-funds-button' type='submit'>{buttonText}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TransferForm;
