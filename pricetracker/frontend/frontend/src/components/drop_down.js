import React, {useState} from 'react'; 
import { useUpdateContext, useUpdateSearchContext } from './api_fetcher';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SearchDropDown() {
    const [category, setCategory] = useState("Choose category to filter by")
    const updateSearch = useUpdateSearchContext();

    const changeFilter = (filter) => {
        setCategory(filter);
        updateSearch(filter.toLowerCase());
    }

    return (
      <DropdownButton className='dd' title={ category } variant='secondary'>
        <Dropdown.Item onClick={() => changeFilter('Brand')}>Brand</Dropdown.Item>
        <Dropdown.Item onClick={() => changeFilter('Address')}>Address</Dropdown.Item>
      </DropdownButton>
    );
  }

export default SearchDropDown