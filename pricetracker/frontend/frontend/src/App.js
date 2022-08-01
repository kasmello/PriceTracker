import React, { useState, useRef } from 'react';
import { ApiProvider } from './components/api_fetcher';
import { FilterProvider } from './components/filter';
import ToggleView from './components/fuelview';
import WelcomePage from './components/welcome_page';
import { PageNotFound, About } from './components/misc_pages';
import Navbar from './components/header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';

// using a class instead of function/const allows for states

function App() {
  const [dataview, setDataView] = useState('table')
  const [selected, selectedEnable] = useState('none')
  const headerRef = useRef(null)

  const changeOrGetSelected = (change=false) => {
    if (change) {selectedEnable(selected == 'none' ? 'multiple' : 'none')}
    return selected
  }

  const changeOrGetDataView = (change=false) => {
    if (change) {setDataView(dataview=='table' ? 'graph' : 'table')}
    return dataview
  }

  return ( 
    <Router>
      <h1 className='Title'>PriceTracker</h1>
      <div className="App">
      <ApiProvider> 
      <FilterProvider>
      <Navbar headerRef={headerRef}/>
        <div className="Content">
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route path="/fuelview" element={
              <>
                <h1>Table of all prices recorded this month</h1>          
                <ToggleView changeOrGetDataView={changeOrGetDataView} 
                changeOrGetSelected={changeOrGetSelected} headerRef={headerRef}/> 
              </>
              } />
            <Route path="/about" element={<About />} />
            <Route element={<PageNotFound />} />
          </Routes>
        </div>
      </FilterProvider>
      </ApiProvider> 
    </div>
  </Router>
  
  );

}

export default App;
