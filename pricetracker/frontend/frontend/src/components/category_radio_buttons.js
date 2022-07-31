import React from 'react';
import { useEditCat, useCatView } from './filter';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ChooseMultiCategory() {
    const updateCat = useEditCat();
    const curCat = useCatView()
    const changeFilter = () => {
        updateCat();
    }
    return (
        <FormControl className='catRadio'>
            <FormLabel id="demo-row-radio-buttons-group-label">Category to filter by</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={curCat}
                onChange={(e,value) => changeFilter()}
            >
                <FormControlLabel value="brand" control={<Radio />} label="Brand" />
                <FormControlLabel value="address" control={<Radio />} label="Address" />
            </RadioGroup>
        </FormControl>
    )
}

export default ChooseMultiCategory