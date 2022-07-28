import React from 'react';
import { SearchBar } from './search_bar.js';
import ChooseMultiCategory from './category_radio_buttons.js';
import ChooseMultiTime from './time_radio_buttons.js';
import Chart from './timeseries';
import Table from './table.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DataTable } from './data_table.js';
import { useDataView, editDataView, useEnableSelect, useSelect } from './view.js';
import { useEditSelect, useEditDup } from './filter.js'


function ToggleView() {
  const select = useSelect();
  const enableSelect = useEnableSelect();
  const editSelect = useEditSelect();
  const updateDataView = editDataView();
  const editDup = useEditDup()
  const currData = useDataView();
  const changeTable = () => {
    enableSelect()
    editDup()
    editSelect([])
  }
  return (
    <div className="ViewContainer">
      {/* { text == 'View Time Graph' ? <DataTable /> : <Chart /> } */}
      {currData=='table' ? <DataTable /> : <Chart />}
      <Col>
        <button className='ChangeView' onClick={() => changeTable()}>{ select=='none' ? 'View Time Graph' : 'Back to Table' }</button>
        <button className='ChangeView' onClick={() => updateDataView()} style={{ display: select== "none" ? "none" : "block" }}
        >{currData=='table' ? 'View Graph of Selected Companies' : 'Back to Selection Page'}</button>
      </Col>
    </div>
  )
}

function FuelView() {
  const select = useSelect();
    return (
      <div>
          <h1>Table of all prices recorded this month</h1> 
            <div className = "searchContainer" >
              <div className = "filterHeaders" >
                {select=='none' ? <ChooseMultiTime /> : console.log('not rendering time')}
                {select=='none' ? <ChooseMultiCategory /> : console.log('not rendering cat')}
                {select=='none' ? <SearchBar /> : console.log('not rendering search')}
              </div>
            </div>          
            <ToggleView />
      </div>
      );

     
    }

  export default FuelView