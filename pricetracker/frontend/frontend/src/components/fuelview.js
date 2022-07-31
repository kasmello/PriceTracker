import React, { useState, useEffect } from 'react';
import SearchBar from './search_bar.js';
import ChooseMultiCategory from './category_radio_buttons.js';
import ChooseMultiTime from './time_radio_buttons.js';
import Chart from './timeseries';
import Col from 'react-bootstrap/Col';
import DataTable from './data_table.js';
import { useEditDup } from './filter.js'
import { usePlaceSelect, useEditGraph } from './api_fetcher.js';


const getDate = (num) => {
  const date = new Date();
  date.setDate(date.getDate()-num);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`
}

const incrementDate = (date) => {
  const new_date = new Date(date)
  new_date.setDate(new_date.getDate()+1);
  const day = new_date.getDate();
  const month = new_date.getMonth() + 1;
  const year = new_date.getFullYear();
  return `${year}-${month}-${day}`
}

const getAllDatesTilCurr = (date, curr) => {
  let x = {category:[]};
  while (Date.parse(date) <= Date.parse(curr)) {
      let temp_object = {label: date}
      x.category.push(temp_object)
      date = incrementDate(date)
  }
  return x
}

function ToggleView(props) {
  const editDup = useEditDup()
  const placeSelect = usePlaceSelect();
  const loadGraphData = useEditGraph();
  const changeTable = () => {
    props.changeSelected()
    editDup();
    if (props.dataview=='graph') {props.updateDataView()}
  }

  const changeData = () => {
    if (placeSelect.length == 0) {
      alert('You have not selected anything!')
    } else {
      const thirty_days_ago = getDate(30), today = getDate(0)
      const x = getAllDatesTilCurr(thirty_days_ago, today)
      loadGraphData(placeSelect)
      props.updateDataView()}
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
          {props.selected==='none' ? <ChooseMultiTime /> : console.log('not rendering time')}
          {props.selected==='none' ? <ChooseMultiCategory /> : console.log('not rendering cat')}
          {props.selected==='none' ? <SearchBar /> : console.log('not rendering search')}
        </div>
      </div>          
      <div className="ViewContainer">
        {props.dataview=='table' ? <DataTable selected={props.selected}/> : <Chart />}
        <Col>
          <button className='ChangeView' onClick={() => changeTable()}>{ props.selected==='none' ? 'View Time Graph' : 'Back to Table' }</button>
          <button className='ChangeView' onClick={() => changeData()} style={{ display: props.selected=== "none" ? "none" : "block" }}
          >{props.dataview=='table' ? 'View Graph of Selected Companies' : 'Back to Selection Page'}</button>
        </Col>
      </div>
    </>
  )
    }


export default ToggleView