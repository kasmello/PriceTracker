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

const columns = (selected) => {
  return ([
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
      display: (selected == 'none' ? true : false),
      filter: false,
      sort: true,
      }
    },
    {
      name: "price",
      label: "Price",
      options: {
      display: (selected == 'none' ? true : false),
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
  ])};

const options = (selected) => {
  return ({
    selectableRows: selected, 
    download: false,
    search: false,
    print: false, 
    viewColumns: false,
    filter: false,
    customToolbarSelect: () => {}
  })
};

function DataTable() {
  const fuelprices = useApiContext();//fuel array
  const selected = useSelect();
  
  return(<MUIDataTable
    data={fuelprices}
    columns={columns(selected)}
    options = {options(selected)} />)
}

export { DataTable, useEnableSelect, SelectedChanger, useSelect }



