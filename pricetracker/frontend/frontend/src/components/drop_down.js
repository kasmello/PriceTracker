import React, {useState} from 'react'; 
import { useUpdateContext } from './api_fetcher';

function DropDown({ title,items = [],multiSelect = false}) 
{
    const [open, setOpen] = useState(false); 
    const [selection, setSelection] = useState([]); 
    const toggle = () => setOpen (!open); 

    function handleOnClick(item) {}

    const options = [
        {
            id: 1, 
            value: 'date',
        },
        {
            id: 2, 
            value: 'price (low-high)',
        },
        {
            id: 2, 
            value: 'price (high-low)',
        },
      ]

    return (
        <div className = "dd-wrapper">
            {/* <DropDown title  = "Select option" options = {options} /> */}
            <div 
                tabIndex={0}
                className = "dd-header"
                role = "button" 
                onKeyPress = {() => toggle (!open)} 
                onClick = {() =>toggle(!open)} 
                > 
                <div className = "dd-header__title">
                    <p className = "dd-header__title -- bold">{title}</p>
                </div>
                <div className = "dd-header__action">
                    <p>{open ? 'Close' : 'Open'}</p>
                </div>
            </div>  
            {open && (
                <ul classNam = "dd-list"> 
                {items.map(item =>(
                    <list className = "dd-list-item" key={item.id}>
                        <button type = "button" onClick = {() => handleOnClick(item)}>
                            <span> {item.value}</span>
                            <span>Selected...</span>
                        </button>
                    </list>
                ))}
                </ul>
            )}
        </div>
    )

}

export { DropDown }; 