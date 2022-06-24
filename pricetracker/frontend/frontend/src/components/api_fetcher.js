//use function with usestate/useeffect hook
import React, { useState, createContext, useContext } from 'react';

const ApiContext = createContext(); 
const UpdateContext = createContext();

function useApiContext() {
    return useContext(ApiContext)
}

function useUpdateContext() {
    return useContext(UpdateContext)
}

function ApiProvider({ children }) {
    const [fuelprices, setPrices] = useState([]);

    const fetchFuels = () => {
            const date = new Date();
            console.log(`from ${date}`)
            const day = date.getDate() -1
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            fetch(`http://127.0.0.1:8000/api/price/from=${year}-${month}-${day}/`)
            .then(response => response.json()) //converts data
            .then(json => {
                setPrices(json)
            })
            console.log(`Fetching from http://127.0.0.1:8000/api/price/from=${year}-${month}-${day}/...`)
        }
    return (
        <ApiContext.Provider value = { fuelprices }>
            <UpdateContext.Provider value = { fetchFuels }>
                { children }
            </UpdateContext.Provider>
        </ApiContext.Provider>
    );

    
    // return (
    // <div className='Infodisplay'>
    //     <h1>All prices recorded this month</h1> 
    //     {fuelprices.map((price) => (
    //         //ol is ordered list
    //         <ol key = { price.id} > 
    //         Brand: { price.brand },
    //         Date: { price.date },
    //         Price: { price.price },
    //         Address: { price.address }

    //         </ol>
    //     ))
    //     }
    // </div>
    // );


}


  export { ApiProvider, useApiContext, useUpdateContext }