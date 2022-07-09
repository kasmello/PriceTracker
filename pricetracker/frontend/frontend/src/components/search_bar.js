import React, { useState } from 'react'
import { useUpdateContext } from './api_fetcher';


function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const filterData = useUpdateContext()
    const handleChange = (e) => {
        // e.preventDefault();
        setSearchInput(e.target.value);
        filterData([
            {
                cat: "brand",
                val: e.target.value,
                exp: '='
            }
        ]);
    };
    return (
    
        <div>    
            <input
            type="search"
            placeholder="Brand Filter"
            onChange={handleChange}
            value={searchInput} />
        </div> 
    
    );
}
export { SearchBar };