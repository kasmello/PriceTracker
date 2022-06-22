import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
  } from 'react-router-dom';


function FuelNavBar() {
    return (
        <div>
            <NavLink to='/fuelview/prices'>Fuel Prices</NavLink>
            <NavLink to='/fuelview/locations'>All Fuel Locations</NavLink>
        </div>
    )
}

export default FuelNavBar