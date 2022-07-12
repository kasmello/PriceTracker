import React, { useRef, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
  } from 'react-router-dom';

const scrollToRef = (ref) => {window.scrollTo({
    top: ref.current.offsetTop,
    left: 0, 
    behaviour: "smooth"}); 
};
function Navbar() {

    const myRef = useRef(null)
    const executeScroll = () => {
        // myRef.current = myRef.current + 1
        // console.log(myRef.current)
        scrollToRef(myRef)
    }

    return (
        <div className='Navigation-bar'>
            <NavLink to='/'>Home</NavLink>
            <NavLink ref={myRef} onClick={executeScroll} to='/fuelview'>Fuel Prices</NavLink>
            <NavLink to='/about'>About</NavLink>
        </div>
    )
}

export default Navbar