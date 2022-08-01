import React, { useState, useEffect } from "react"
import MUIDataTable from "mui-datatables";
import { getFilteredData } from "./filter";
import { editPlaceSelect } from "./api_fetcher";

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
      customBodyRender: value => <span>{value}c/L</span>
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

const options = (selected,selectedRows,fuelprices,changePlaceSelect, setSelectedRows) => {
  return ({
  selectableRows: selected, 
  download: false,
  search: selected=='none' ? false : true,
  print: false, 
  viewColumns: false,
  filter: false,
  rowsSelected: selectedRows,
  selectToolbarPlacement: 'above',
  customToolbarSelect: () => {},
  onRowSelectionChange: (currSelectedRow,allSelectedRows,allRowIndexes) => {
    var placeIndex = []
    setSelectedRows(allSelectedRows.map(row => {
      placeIndex.push(fuelprices[row.dataIndex].place_id)
      return row.dataIndex
    }));
    console.log(placeIndex)
    changePlaceSelect(placeIndex)
  },
  draggableColumns: {
    enabled: true,
  },
  })}

function DataTable(props) {
  const getdatafunc = getFilteredData();//fuel array
  const fuelprices = getdatafunc()
  const [selectedRows, setSelectedRows] = useState([]);
  const changePlaceSelect = editPlaceSelect();

  useEffect(() => {
    console.log('Selected rows reset')
    changePlaceSelect([])
    setSelectedRows([])},fuelprices)
  return(<MUIDataTable
    data={fuelprices}
    columns={columns(props.selected)}
    options = {options(props.selected,selectedRows,fuelprices,changePlaceSelect, setSelectedRows)} />)
}

export default DataTable



