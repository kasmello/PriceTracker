import React from 'react';
import { useApiContext } from './api_fetcher.js';//import these to use api
import { SearchBar } from './search_bar.js';
import DropDown from './drop_down';


const options = [
  {
      id: 1, 
      value: 'date',
  },
  {
      id: 2, 
      value: 'price (low-high)',
  },
  {
      id: 2, 
      value: 'price (high-low)',
  },
]

function Table() {
    const fuelprices = useApiContext();//fuel array
    // const filterFuels = useUpdateContext();
    return (
        <div className="Table">
          <h1>Table of all prices recorded this month</h1> 
          <SearchBar />
          <DropDown />
                  <div className = "container" >
              <DropDown title  = "Select option" options = {options} />
              </div>
          <table>
            <tbody>
            <tr>
              <th>Brand</th>
              <th>Date</th>
              <th>Price</th>
              <th>Address</th>
            </tr>
            
            {fuelprices.map((price) => {
              return (
                <tr key = {price.id} > 
                  <td>{price.brand}</td>
                  <td>{price.date}</td>
                  <td>{price.price}</td>
                  <td>{price.address}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      );

     
    }





  export default Table