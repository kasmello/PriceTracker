import React, { useState, useEffect } from "react"
import MUIDataTable from "mui-datatables";
import { editPlaceSelect, useApiContext } from "./api_fetcher";
import { styled, createTheme, ThemeProvider } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";

const customTheme = createTheme({
  overrides: {
    MUIDataTableFilter: {
      root: {
        minWidth: '20vw',  // Adjust the width as needed
      },
    },
    MUIDataTableFilterList: {
      chip: {
        marginRight: '8px',  // Adjust the margin as needed
      },
    },
  },
});

const columns = (selected) => {
  return ([
    {
      name: "brand",
      label: "Brand",
      options: {
      filter: true,
      sort: true,
      }
    },
    {
      name: "date",
      label: "Date",
      options: {
      display: false,
      filter: false,
      sort: true,
      }
    },
    {
      name: "address",
      label: "Address",
      options: {
      filter: false,
      sort: true,
      }
    },
    {
      name: "location",
      label: "Location",
      options: {
      filter: true,
      sort: true,
      }
    },
    {
      name: "price",
      label: "Price",
      options: {
      display: (selected === 'none' ? true : false),
      filter: false,
      sort: true,
      customBodyRender: value => <span>{value}c/L</span>
      }
    },
    {
      name: "description",
      label: "Description",
      options: {
      display: (selected === 'none' ? true : false),
      filter: false,
      sort: false,
      }
    },
    {
      name: "product",
      label: "Fuel Type",
      options: {
      display: (selected === 'none' ? false : true),
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        return(
        <div>
          <FormControlLabel control={
          <Checkbox />
          } label="Unleaded Petrol" />
          <FormControlLabel control={
          <Checkbox />
          } label="E85" />
          <FormControlLabel control={
          <Checkbox />
          } label="98 RON" />
        </div>
        )
      }
      
      }
    },
  ])};

const options = (selected, selectedRows,fuelprices,changePlaceSelect, setSelectedRows) => {
  return ({
  selectableRows: selected, 
  download: false,
  search: true,
  print: false, 
  viewColumns: false,
  filter: true,
  rowsSelected: selectedRows,
  selectToolbarPlacement: 'above',
  customToolbarSelect: () => {},
  onRowSelectionChange: (currSelectedRow,allSelectedRows,allRowIndexes) => {
    var placeIndex = []
    setSelectedRows(allSelectedRows.map(row => {
      placeIndex.push(fuelprices[row.dataIndex].address)
      return row.dataIndex
    }));
    changePlaceSelect(placeIndex)
  },
  draggableColumns: {
    enabled: true,
  },
  })}

function DataTable(props) {
  const fuelprices = useApiContext()
  const [selectedRows, setSelectedRows] = useState([]);
  const changePlaceSelect = editPlaceSelect();

  // useEffect(() => {
  //   console.log('Table reloaded')
    // changePlaceSelect([])
    // setSelectedRows([])
  // }, [fuelprices])


  return(
    <ThemeProvider theme={customTheme}>
    <MUIDataTable
      data={fuelprices}
      columns={columns(props.selected)}
      options = {options(props.selected,selectedRows,fuelprices,changePlaceSelect, setSelectedRows)} 
    />
    </ThemeProvider>
  )}

export default DataTable



