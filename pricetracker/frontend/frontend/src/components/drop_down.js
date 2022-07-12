import React, {useState} from 'react'; 
import { useUpdateContext } from './api_fetcher';

function DropDown({ title,options = [],multiSelect = false}) 
{
    const [open, setOpen] = useState(false); 
    const [selection, setSelection] = useState([]); 
    const toggle = () => setOpen (!open); 

    function handleOnClick(item) {}


    return (
        
        <div className = "dd-wrapper">
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
                <ul className = "dd-list"> 
                {options.map(item =>(
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

export default DropDown