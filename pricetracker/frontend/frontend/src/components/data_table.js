import React from "react"
import MUIDataTable from "mui-datatables";
import { useApiContext } from './api_fetcher.js';//import these to use api


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

const options = {
  selectableRows: false, 
  download: false,
  search: false,
  print: false, 
  viewColumns: false,
  filter: false
};

function DataTable() {
  const fuelprices = useApiContext();//fuel array
  return(<MUIDataTable
  data={fuelprices}
  columns={columns}
  options = {options} />)
}

export default DataTable



