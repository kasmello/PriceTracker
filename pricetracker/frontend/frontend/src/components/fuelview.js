import React, { useState } from 'react';
import { SearchBar } from './search_bar.js';
import SearchDropDown from './search_drop_down';
import ChooseMultiCategory from './category_radio_buttons.js';
import ChooseMultiTime from './time_radio_buttons.js';
import Chart from './timeseries';
import Table from './table.js';
import DataTable from './data_table.js';


function ToggleView() {
  const [text, changeText] = useState('View Time Graph')
  const changeView = () => {
      changeText(text == 'View Time Graph' ? 'View Table' : 'View Time Graph')
  }

  return (
    <div className="ViewContainer">
      { text == 'View Time Graph' ? <DataTable /> : <Chart /> }
      <button className='ChangeView' onClick={() => changeView()}>{ text }</button>
    </div>
  )
}

function FuelView() {

    return (
      <div>
          <h1>Table of all prices recorded this month</h1> 
            <div className = "searchContainer" >
              <div className = "filterHeaders" >
                <ChooseMultiTime />
                <ChooseMultiCategory />
                <SearchBar />
              </div>
            </div>          
            <ToggleView />
      </div>
      );

     
    }

  export default FuelView