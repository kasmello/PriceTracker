//use function with usestate/useeffect hook
import React, { useState, createContext, useContext, useEffect } from 'react';

const ApiContext = createContext(); 
const ChangeDateScope = createContext();

function useApiContext() {
    return useContext(ApiContext)
}

function editDateScope() {
    return useContext(ChangeDateScope)
}

function ApiProvider({ children }) {

    const [fuelprices, setPrices] = useState([]);

    const getDate = (num) => {
        const date = new Date();
        date.setDate(date.getDate()-num);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`
    }

    const getLink = (num) => {
        const date = getDate(num)
        console.log(`Fetching from http://127.0.0.1:8000/api/price/from=${date}/...`)
        return `http://127.0.0.1:8000/api/price/from=${date}/`
    };

    const changeDateScope = (num) => {  
        const grabEarliestDate = () => {
            fuelprices.sort((a, b) => {
                let da = new Date(a.date).setHours(0, 0, 0, 0), //rounds to nearest date
                    db = new Date(b.date).setHours(0, 0, 0, 0);
                return da - db;  
            })  
            return fuelprices[0].date
        };
        
        const checkIfReloadNeeded = ([old_date, new_date]) => {
            let oldd = new Date(old_date).setHours(0, 0, 0, 0),
                newd = new Date(new_date).setHours(0, 0, 0, 0)
            if (newd < oldd) {
                console.log('Client does not have data for ' + new_date + ', fetching...')
                fetchFuels(num)
            }
        }
        var new_date = getDate(num)
        const earliest_date = grabEarliestDate()
        checkIfReloadNeeded([earliest_date, new_date])
    }

    const fetchFuels = (num) => {
            fetch(getLink(num))
            .then(response => response.json()) //converts data
            .then(json => {
                setPrices(json)
            })
            
        };


    useEffect(() => {
        fetchFuels(1);
    },[]); //acts as component did mount, only executes once on launch

    
    return (
        <ApiContext.Provider value = { fuelprices }>
        <ChangeDateScope.Provider value = { changeDateScope }>
            { children }
        </ChangeDateScope.Provider>
        </ApiContext.Provider>
    );

}


  export { ApiProvider, useApiContext, editDateScope }
