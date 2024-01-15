import React from 'react';
import { changeProduct } from './api_fetcher';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ChooseMultiCategory() {
    const updateCat = changeProduct();
    const changeFilter = (product) => {
        updateCat(product);
    }
    return (
        <FormControl className='catRadio'>
            <FormLabel id="demo-row-radio-buttons-group-label">Petrol type to filter by</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue='UnleadedPetrol'
                onChange={(e,value) => changeFilter(value)}
            >
                <FormControlLabel value="UnleadedPetrol" control={<Radio />} label="Unleaded Petrol" />
                <FormControlLabel value="E85" control={<Radio />} label="E85" />
                <FormControlLabel value="98RON" control={<Radio />} label="98 RON" />
            </RadioGroup>
        </FormControl>
    )
}

export default ChooseMultiCategory