import React, { useState } from 'react';
import { SearchBar } from './search_bar.js';
import DropDown from './drop_down';
import Chart from './timeseries';
import Table from './table.js';


const options = [
  {
      id: 1, 
      value: 'date',
  },
  {
      id: 2, 
      value: 'price (low-high)',
  },
  {
      id: 2, 
      value: 'price (high-low)',
  },
]

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
            <SearchBar />
            <div className = "container" >
              <DropDown title  = "Select option" options = {options} />
            </div>          
            <ToggleView />
      </div>
      );

     
    }

  export default FuelView