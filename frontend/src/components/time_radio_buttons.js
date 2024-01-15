import React from 'react';
import { changeDateMode } from './api_fetcher';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ChooseMultiTime() {
    const updateDateMode = changeDateMode();
    const changeFilter = (filter) => {
        updateDateMode(filter);
    }

    return (
        <div className='timeRadio'>
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Choose which data to view</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue='tdy'
                name="row-radio-buttons-group"
                onChange={(e,value) => changeFilter(value)}
            >
                <FormControlLabel value={'tdy'} control={<Radio />} label="Today" />
                <FormControlLabel value={'tmr'} control={<Radio />} label="Tomorrow" />
            </RadioGroup>
        </FormControl>
        </div>
    )
}

export default ChooseMultiTime