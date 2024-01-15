import React, { useEffect } from 'react';
import ChooseMultiCategory from './category_radio_buttons.js';
import ChooseMultiTime from './time_radio_buttons.js';
import Chart from './timeseries';
import Col from 'react-bootstrap/Col';
import DataTable from './data_table.js';
import { usePlaceSelect, useEditGraph } from './api_fetcher.js';

function ToggleView(props) {
  const placeSelect = usePlaceSelect();
  const loadGraphData = useEditGraph();
  const changeTable = () => {
    props.changeOrGetSelected(true)
    if (props.changeOrGetDataView()==='graph') {props.changeOrGetDataView(true)}
  }

  const changeData = () => {
    if (placeSelect.length === 0) {
      alert('You have not selected anything!')
    } else {
      loadGraphData()
      props.changeOrGetDataView(true)}
  }
  
  const scrollToRef = (ref) => {window.scrollTo({
    top: ref.current.offsetTop,
    left: 0, 
    behaviour: "smooth"}); 
  }

  useEffect(() => {
    scrollToRef(props.headerRef)
  },[])

  return (
    <>
      <div className = "searchContainer" >
        <div className = "filterHeaders" >
          {props.changeOrGetSelected()==='none' ? <ChooseMultiTime /> : console.log('not rendering time')}
          {props.changeOrGetSelected()==='none' ? <ChooseMultiCategory /> : console.log('not rendering cat')}
        </div>
      </div>          
      <div className="ViewContainer">
        {props.changeOrGetDataView()==='table' ? <DataTable selected={props.changeOrGetSelected()}/> : <Chart />}
        <Col>
          <button className='ChangeView' onClick={() => changeTable()}>{ props.changeOrGetSelected()==='none' ? 'View Time Graph' : 'Back to Table' }</button>
          <button className='ChangeView' onClick={() => changeData()} style={{ display: props.changeOrGetSelected()=== "none" ? "none" : "block" }}
          >{props.changeOrGetDataView()==='table' ? 'View Graph of Selected Companies' : 'Back to Selection Page'}</button>
        </Col>
      </div>
    </>
  )
    }


export default ToggleView