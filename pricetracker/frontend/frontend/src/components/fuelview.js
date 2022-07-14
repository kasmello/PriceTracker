import React, { useState } from 'react';
import { SearchBar } from './search_bar.js';
import SearchDropDown from './drop_down';
import Chart from './timeseries';
import Table from './table.js';


function ToggleView() {
  const [text, changeText] = useState('View Time Graph')
  const changeView = () => {
      changeText(text == 'View Time Graph' ? 'View Table' : 'View Time Graph')
  }

  return (
    <div className="ViewContainer">
      { text == 'View Time Graph' ? <Table /> : <Chart /> }
      <button className='ChangeView' onClick={() => changeView()}>{ text }</button>
    </div>
  )
}

function FuelView() {

    return (
      <div>
          <h1>Table of all prices recorded this month</h1> 
            <div className = "searchContainer" >
              <SearchDropDown />
              <SearchBar />
            </div>          
            <ToggleView />
      </div>
      );

     
    }

  export default FuelView