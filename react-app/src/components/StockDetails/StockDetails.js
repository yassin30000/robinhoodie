import "./StockDetails.css";
import { useEffect, useState } from 'react';


function StockDetails() {
    const [data, setData] = useState(null);


    const fetchStockData = () => {
        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=JCQDATAA7R7K8EBJ")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
                console.log(data)
            })
    }

    useEffect(() => {
        fetchStockData()
      }, [])

    return (
        <div id='stock-details-container'>
            <div id='stock-ticker'>{data["Meta Data"]['2. Symbol']}</div>
        </div>
    );
}

export default StockDetails;
