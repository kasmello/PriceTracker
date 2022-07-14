import React, { useState } from 'react'
import { useUpdateContext, useSearchContext } from './api_fetcher';

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const curCat = useSearchContext();
    const filterData = useUpdateContext()
    const handleChange = (e) => {
        // e.preventDefault();
        setSearchInput(e.target.value);
        filterData([
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
            placeholder="Brand Filter"
            onChange={handleChange}
            value={searchInput} />
        </div> 
    
    );
}
export { SearchBar };