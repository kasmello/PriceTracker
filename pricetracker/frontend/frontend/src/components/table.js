import React from 'react';
import { useApiContext } from './api_fetcher.js';//import these to use api

function Table() {
    const fuelprices = useApiContext();//fuel array
    return (
      <div className="TableContainer">
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

export default Table;