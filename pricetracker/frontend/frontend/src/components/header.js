import React, { useRef, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
  } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            <Row>
                <NavLink to='/' className='directoryButton'>Home</NavLink>
                <a>&nbsp;</a>
                <NavLink to='fuelview' ref={myRef} onClick={executeScroll} className='directoryButton'>Fuel Prices</NavLink>
                <a>&nbsp;</a>
                <NavLink to='/about' className='directoryButton'>About</NavLink>
            </Row>
        </div>
    )
}

export default Navbar