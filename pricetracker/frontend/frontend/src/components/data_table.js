import React from "react"
import MUIDataTable from "mui-datatables";
import { getFilteredData, useEditSelect, useFuelSelect } from "./filter";
import { useEnableSelect, useSelect } from "./view";

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


function DataTable() {
  const getdatafunc = getFilteredData();//fuel array
  const fuelprices = getdatafunc()
  const selected = useSelect();
  const editfuel = useEditSelect();
  const selectedfuels = useFuelSelect();
  const options = () => {
    return ({
      selectableRows: selected, 
      download: false,
      search: selected=='none' ? false : true,
      print: false, 
      viewColumns: false,
      filter: false,
      rowsSelected: selectedfuels,
      selectToolbarPlacement: 'above',
      customToolbarSelect: () => {},
      onRowSelectionChange: (a,b,allRowIndexes) => {
        editfuel(allRowIndexes);
      },
      draggableColumns: {
        enabled: true,
      },
    })
  };
  
  return(<MUIDataTable
    data={fuelprices}
    columns={columns(selected)}
    options = {options()} />)
}

export { DataTable, useEnableSelect, useSelect }



