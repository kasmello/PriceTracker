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
            <button className='navlink'><NavLink to='/'>Home</NavLink></button>
            <button className='navlink'><NavLink to='fuelview' ref={myRef} onClick={executeScroll} className='directoryButton'>Fuel Prices</NavLink></button>
            <button className='navlink'><NavLink to='/about'>About</NavLink></button>
        </div>
    )
}

export default Navbar