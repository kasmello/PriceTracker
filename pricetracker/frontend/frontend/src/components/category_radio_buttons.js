import React, { useState } from 'react';
import { useUpdateSearchContext } from './api_fetcher';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ChooseMultiCategory() {
    const updateSearch = useUpdateSearchContext();
    const changeFilter = (filter) => {
        updateSearch(filter.toLowerCase());
    }
    return (
        <FormControl className='catRadio'>
            <FormLabel id="demo-row-radio-buttons-group-label">Category to filter by</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="brand"
                onChange={(e,value) => changeFilter(value)}
            >
                <FormControlLabel value="brand" control={<Radio />} label="Brand" />
                <FormControlLabel value="address" control={<Radio />} label="Address" />
            </RadioGroup>
        </FormControl>
    )
}

export default ChooseMultiCategory