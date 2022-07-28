import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
  } from 'react-router-dom';
import { useHeaderRef } from './view.js'

function Navbar() {
    const headerRef = useHeaderRef()
    return (
        <div className='Navigation-bar'>
            <NavLink to='/'><button className='navlink'>Home</button></NavLink>
            <NavLink to='fuelview' ref={headerRef} className='navlink'><button className='navlink'>Fuel Prices</button></NavLink>
            <NavLink to='/about'><button className='navlink'>About</button></NavLink>
        </div>
    )
}

export default Navbar