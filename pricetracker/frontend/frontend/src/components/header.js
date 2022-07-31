import React from "react";
import { NavLink } from 'react-router-dom';

function Navbar(props) {
    return (
        <div className='Navigation-bar'>
            <NavLink to='/'><button className='navlink'>Home</button></NavLink>
            <NavLink to='fuelview' ref={props.headerRef} className='navlink'><button className='navlink'>Fuel Prices</button></NavLink>
            <NavLink to='/about'><button className='navlink'>About</button></NavLink>
        </div>
    )
}

export default Navbar