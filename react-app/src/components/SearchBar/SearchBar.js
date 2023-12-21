import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import './SearchBar.css'


function SearchBar({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([])
    const [searchResults, setSearchResults] = useState(true)
    const searchRef = useRef(null);


    const stocks = data ? Object.values(data.stocks) : []

    const closeSearch = () => setSearchResults(false);

    const handleFilter = (event) => {
        let searchWord = event.target.value;
        const newFilter = stocks.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.ticker.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === '') {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }

        if (!newFilter.length) {
            setFilteredData([{
                "ticker": "This ticker does not exist",
                "description": "This ticker does not exist, please revise your search!"}])
        }
    }


    useEffect(() => {

        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) closeSearch();
        };
        if (searchResults) window.addEventListener('click', handleClickOutside);


        return () => {
            window.removeEventListener('click', handleClickOutside)
        };


    }, [searchResults])


    return (
        <div className="search">
            <div className='searchInputs'>
                <input ref={searchRef} type="text" placeholder={placeholder} onChange={handleFilter} onClick={() => { setSearchResults(true) }} />
                <div></div>
            </div>


            {filteredData.length > 0 &&
                <div className={searchResults ? "dataResult" : "hidden"}>
                    {filteredData?.map((stock, key) => {
                        return (
                            <Link key={key} className='stockName' to={`/stocks/${stock?.ticker}`}>
                                {stock?.ticker === "This ticker does not exist" ?
                                    <p id="ticker-does-not-exist">{stock?.description}</p> :
                                    <div className="dataResults-container">
                                        <p>{stock?.ticker}</p> <p>{stock?.name}</p>
                                    </div>}
                            </Link>
                        )
                    })}

                </div>
            }
        </div>
    )
}

export default SearchBar;
