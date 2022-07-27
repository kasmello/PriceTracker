import React, { useState } from 'react'
import { useEditString, useSearchView, useCatView } from './filter';

function SearchBar() {
    const curInput = useSearchView();
    const curCat = useCatView();
    const filterSearch = useEditString()
    const handleChange = (e) => {
        // e.preventDefault();
        filterSearch(e.target.value);
    };
    return (
    
        <div>    
            <input
            type="search"
            name="searchBar"
            placeholder= {curCat.charAt(0).toUpperCase() + curCat.slice(1) + " "  +"Filter"} 
            onChange={handleChange}
            value={curInput} />
        </div> 
    
    );
}
export { SearchBar };