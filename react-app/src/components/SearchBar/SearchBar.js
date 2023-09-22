import React, { useState } from "react";
import { Link } from "react-router-dom";
import './SearchBar.css'


function SearchBar({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([])

    // console.log(data.stocks) 
    const stocks = data ? Object.values(data.stocks) : []

    // console.log(stocks)
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = stocks.filter( (value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.ticker.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === '') {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }
    // console.log(filteredData)


    return (
        <div className="search">
            <div className='searchInputs'>
                <input type="text" placeholder={placeholder} onChange={handleFilter}/>
                <div></div>
            </div>
            { filteredData.length > 0 &&
                <div className="dataResult">
                    {filteredData?.map((stock, key) => {
                        return (
                            <Link className='stockName' to={`/stocks/${stock?.ticker}`}>
                                <p>{stock?.ticker}   {stock?.name} </p>
                            </Link>
                        )
                    })}

                </div>
            }
        </div>
    )
}

export default SearchBar;
