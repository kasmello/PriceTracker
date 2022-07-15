import React, { useState } from 'react'
import { useUpdateContext, useSearchContext } from './api_fetcher';

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const curCat = useSearchContext();
    const filterData = useUpdateContext()
    const handleChange = (e) => {
        // e.preventDefault();
        setSearchInput(e.target.value);
        filterData([0,
            {
                cat: curCat,
                val: e.target.value,
                exp: '='
            }
        ]);
    };
    return (
    
        <div>    
            <input
            type="search"
            name="searchBar"
            placeholder= {curCat.charAt(0).toUpperCase() + curCat.slice(1) + " "  +"Filter"} 
            onChange={handleChange}
            value={searchInput} />
        </div> 
    
    );
}
export { SearchBar };