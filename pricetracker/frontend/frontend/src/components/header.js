import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
  } from 'react-router-dom';


function Navbar() {
    return (
        <div class='Navigation-bar'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/fuelview'>Fuel Prices</NavLink>
            <NavLink to='/about'>About</NavLink>
        </div>
    )
}

export default Navbar