import React, { useState } from 'react';
import { useUpdateDateContext } from './api_fetcher';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ChooseMultiTime() {
    const updateSearch = useUpdateDateContext();
    const changeFilter = (filter) => {
        updateSearch(parseInt(filter));
    }

    return (
        <div className='timeRadio'>
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Time span of data</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="1"
                name="row-radio-buttons-group"
                onChange={(e,value) => changeFilter(value)}
            >
                <FormControlLabel value="1" control={<Radio />} label="Day" />
                <FormControlLabel value="7" control={<Radio />} label="Week" />
                <FormControlLabel value="30" control={<Radio />} label="Month" />
            </RadioGroup>
        </FormControl>
        </div>
    )
}

export default ChooseMultiTime