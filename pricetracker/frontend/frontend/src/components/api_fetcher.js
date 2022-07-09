//use function with usestate/useeffect hook
import React, { useState, createContext, useContext, useEffect } from 'react';

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
    const [fuelview, setView] = useState([]);

    const getLink = () => {
        const date = new Date();
        const day = date.getDate() -1;
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        console.log(`Fetching from http://127.0.0.1:8000/api/price/from=${year}-${month}-${day}/...`)
        return `http://127.0.0.1:8000/api/price/from=${year}-${month}-${day}/`
    };

    const fetchFuels = () => {
            fetch(getLink())
            .then(response => response.json()) //converts data
            .then(json => {
                setPrices(json)
                setView(json)
            })
            
        };

    const filterData = (filterArray) => {
    //example filter data
    //row.cat = "brand", row.val = "ampol", row.exp = "greater"
        filterArray.map((rowFilt) => {       
            if (rowFilt.val.length > 0) {
                const filterFunction = (row) => {
                    const category = {
                        brand: row.brand,
                        date: row.date,
                        price: row.price,
                        place: row.place
                    }
                    if (rowFilt.exp === '>=') {
                        return category[rowFilt.cat] >= rowFilt.val;
            
                    }
                    else if (rowFilt.exp === '=') {
                        return category[rowFilt.cat].toLowerCase().startsWith(rowFilt.val.toLowerCase());
            
                    }
                    else if (rowFilt.exp === '<=') {
                        return category[rowFilt] <= rowFilt.val;
                    }
                }
                setView(fuelprices.filter(filterFunction))
                
            }
            else {
                setView(fuelprices)
            }
            
        });
        
    };

    useEffect(() => {
        fetchFuels();
    },[]); //acts as component did mount, only executes once on launch

    
    return (
        <ApiContext.Provider value = { fuelview }>
            <UpdateContext.Provider value = { filterData }>
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