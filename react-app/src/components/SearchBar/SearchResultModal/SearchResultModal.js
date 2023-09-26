import React from 'react'
import { Link } from "react-router-dom";

function SearchResultModal(filteredData, searchResults) {



    return (
        <>
            {filteredData.length > 0 &&
                <div className={searchResults ? "dataResult" : "dataResult hidden"}>
                    {filteredData?.map((stock, key) => {
                        return (
                            <Link key={key} className='stockName' to={`/stocks/${stock?.ticker}`}>
                                <div className="dataResults-container">
                                    <p>{stock?.ticker}</p> <p>{stock?.name}</p>

                                </div>
                            </Link>
                        )
                    })}

                </div>
            }
        </>
    )
}

export default SearchResultModal