import React, { useState } from 'react'
import { useEditString, useGetCat } from './filter';

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const curCat = useGetCat();
    const filterSearch = useEditString()
    const handleChange = (e) => {
        // e.preventDefault();
        setSearchInput(e.target.value);
        filterSearch(e.target.value);
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