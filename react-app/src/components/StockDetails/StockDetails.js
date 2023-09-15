import "./StockDetails.css";
import { useEffect } from 'react';
import { fetchStockData } from "../../store/stocks";
import {Link, useParams} from "react-router-dom";
import { useDispatch } from "react-redux";


function StockDetails() {
    const { ticker } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchStockData(ticker))
    }, [dispatch, ticker])


    return (
        <div id='stock-details-container'>
            {/* <div id='stock-ticker'>{data["Meta Data"]['2. Symbol']}</div> */}
            <Link to='/stocks/AAPL'>AAPL</Link>
            <Link to='/stocks/SPY'>SPY</Link>
            <Link to='/stocks/DIS'>DIS</Link>
            <Link to='/stocks/UBER'>UBER</Link>
        </div>
    );
}

export default StockDetails;
