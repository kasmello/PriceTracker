import React, { useEffect } from 'react';
import { SearchBar } from './search_bar.js';
import ChooseMultiCategory from './category_radio_buttons.js';
import ChooseMultiTime from './time_radio_buttons.js';
import Chart from './timeseries';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DataTable } from './data_table.js';
import { useDataView, editDataView, useEnableSelect, useSelect, useHeaderRef } from './view.js';
import { useEditSelect, useEditDup, useFuelSelect } from './filter.js'


function ToggleView() {
  const select = useSelect();
  const fuelSelected = useFuelSelect();
  const enableSelect = useEnableSelect();
  const editSelect = useEditSelect();
  const updateDataView = editDataView();
  const editDup = useEditDup()
  const currData = useDataView();
  const headerRef = useHeaderRef();
  const changeTable = () => {
    enableSelect()
    editDup();
    editSelect([]);
    if (currData=='graph') {updateDataView()}
  }

  const changeData = () => {
    if (fuelSelected.length == 0) {
      alert('You have not selected anything!')
    } else {
      updateDataView()}
  }
  
  const scrollToRef = (ref) => {window.scrollTo({
    top: ref.current.offsetTop,
    left: 0, 
    behaviour: "smooth"}); 
  }

  useEffect(() => {
    scrollToRef(headerRef)
  },[])


  return (
    <div className="ViewContainer">
      {/* { text == 'View Time Graph' ? <DataTable /> : <Chart /> } */}
      {currData=='table' ? <DataTable /> : <Chart />}
      <Col>
        <button className='ChangeView' onClick={() => changeTable()}>{ select=='none' ? 'View Time Graph' : 'Back to Table' }</button>
        <button className='ChangeView' onClick={() => changeData()} style={{ display: select== "none" ? "none" : "block" }}
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