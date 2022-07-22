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
            <NavLink to='/'><button className='navlink'>Home</button></NavLink>
            <NavLink to='fuelview' ref={myRef} onClick={() => executeScroll()} className='directoryButton'><button className='navlink'>Fuel Prices</button></NavLink>
            <NavLink to='/about'><button className='navlink'>About</button></NavLink>
        </div>
    )
}

export default Navbar