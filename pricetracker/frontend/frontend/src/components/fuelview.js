import React, { useState } from 'react';
import { SearchBar } from './search_bar.js';
import SearchDropDown from './search_drop_down';
import ChooseMultiCategory from './category_radio_buttons.js';
import ChooseMultiTime from './time_radio_buttons.js';
import Chart from './timeseries';
import Table from './table.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DataTable, useEnableSelect } from './data_table.js';


function ToggleView() {
  const [text, changeText] = useState('View Time Graph')
  const enableSelect = useEnableSelect()
  const changeView = () => {
      changeText(text == 'View Time Graph' ? 'Back to Table' : 'View Time Graph')
      enableSelect()
  }
  return (
    <div className="ViewContainer">
      {/* { text == 'View Time Graph' ? <DataTable /> : <Chart /> } */}
      <DataTable />
      <Col>
      <button className='ChangeView' onClick={() => changeView()}>{ text }</button>
      <button className='ChangeView' style={{ display: text== "View Time Graph" ? "none" : "block" }}
      >View Graph of Selected Companies</button>
      </Col>
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