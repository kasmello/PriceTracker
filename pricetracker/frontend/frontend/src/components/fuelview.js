import React from 'react';
import { SearchBar } from './search_bar.js';
import ChooseMultiCategory from './category_radio_buttons.js';
import ChooseMultiTime from './time_radio_buttons.js';
import Chart from './timeseries';
import Table from './table.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DataTable, useEnableSelect, useSelect } from './data_table.js';
import { useDataView, editDataView } from './view.js';
import { FilterProvider } from './filter.js';


function ToggleView() {
  const select = useSelect();
  const enableSelect = useEnableSelect();
  const updateDataView = editDataView();
  const currData = useDataView();
  return (
    <div className="ViewContainer">
      {/* { text == 'View Time Graph' ? <DataTable /> : <Chart /> } */}
      {currData=='table' ? <DataTable /> : <Chart />}
      <Col>
        <button className='ChangeView' onClick={() => enableSelect()}>{ select=='none' ? 'View Time Graph' : 'Back to Table' }</button>
        <button className='ChangeView' style={{ display: select== "none" ? "none" : "block" }} onClick={() => updateDataView()}
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