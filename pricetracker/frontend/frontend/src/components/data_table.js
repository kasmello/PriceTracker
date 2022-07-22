import React, { createContext, useContext, useState } from "react"
import MUIDataTable from "mui-datatables";
import { useApiContext } from './api_fetcher.js';//import these to use api

const EnableSelect = createContext()
const SelectContext = createContext()

function useEnableSelect() {
  return useContext(EnableSelect)
}

function useSelect() {
  return useContext(SelectContext)
}

function SelectedChanger({ children }) {
  const [selected, selectedEnable] = useState('none')
  const changeSelected = () => {
    selectedEnable(selected == 'none' ? 'multiple' : 'none')
  }
  return (
    <SelectContext.Provider value = { selected }>
    <EnableSelect.Provider value = { changeSelected }>
      { children }
    </EnableSelect.Provider>
    </SelectContext.Provider>
  )
}


const columns = [
 {
  name: "brand",
  label: "Brand",
  options: {
   filter: false,
   sort: true,
  }
 },
 {
  name: "date",
  label: "Date",
  options: {
   filter: false,
   sort: true,
  }
 },
 {
  name: "price",
  label: "Price",
  options: {
   filter: false,
   sort: true,
  }
 },
 {
  name: "address",
  label: "ADDRESS",
  options: {
   filter: false,
   sort: false,
  }
 },
];


function DataTable() {
  const fuelprices = useApiContext();//fuel array
  const selected = useSelect();
  const options = {
    selectableRows: selected, 
    download: false,
    search: false,
    print: false, 
    viewColumns: false,
    filter: false,
    customToolbarSelect: () => {}
  };
  
  return(<MUIDataTable
  data={fuelprices}
  columns={columns}
  options = {options} />)
}

export { DataTable, useEnableSelect, SelectedChanger, useSelect }



