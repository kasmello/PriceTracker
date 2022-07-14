//use function with usestate/useeffect hook
import React, { useState, createContext, useContext, useEffect } from 'react';

const ApiContext = createContext(); 
const UpdateContext = createContext();
const SearchContext = createContext();
const UpdateSearchContext = createContext()
const UpdateDateContext = createContext()

function useApiContext() {
    return useContext(ApiContext)
}

function useUpdateContext() {
    return useContext(UpdateContext)
}

function useSearchContext() {
    return useContext(SearchContext);
}

function useUpdateSearchContext() {
    return useContext(UpdateSearchContext);
}

function useUpdateDateContext() {
    return useContext(UpdateDateContext);
}


function ApiProvider({ children }) {

    const [fuelprices, setPrices] = useState([]);
    const [fuelview, setView] = useState([]);
    const [dateScope, setScope] = useState(1);
    const [maxScope, setMax] = useState(1);
    const [places, setPlaces] = useState([]);
    const [searchCat, changeCat] = useState('brand');
    const [filterArray, setFilter] = useState([{},{}]);

    const getDate = (num) => {
        const date = new Date();
        const day = date.getDate() - (num);
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
        setScope(num);        
        let checkIfReloadNeeded = new Promise((resolve, reject) => {
            if (num > maxScope) {
                setMax(num)
                fetchFuels(num)
            }
            resolve()
        })
        checkIfReloadNeeded.then(() => changeFilter([1, {
            cat: 'date',
            val: getDate(num),
            exp: '>='
        }]))
        
    }

    const fetchFuels = (num) => {
            fetch(getLink(num))
            .then(response => response.json()) //converts data
            .then(json => {
                setPrices(json)
                setView(json)
            })
            
        };

    const changeSearchCat = (category) => {
        changeCat(category);
        console.log(`changed category to ${category}`)
    }


    const fetchPlaces = () => {
        console.log('Fetching from http://127.0.0.1:8000/api/...')
        fetch('http://127.0.0.1:8000/api/')
        .then(response => response.json())
        .then(json => {
            setPlaces(json)
        })
    }

    const changeFilter = (filt) => {
        var tempArray = filterArray;
        tempArray[filt[0]] = filt[1]
        setFilter(tempArray)
        filterData(tempArray)
    }
    const filterData = (array) => {
    //example filter data
    //row.cat = "brand", row.val = "ampol", row.exp = "greater"
        let tempArray = fuelprices
        array.map((rowFilt) => {   
            if (Object.keys(rowFilt).length > 0) {   
                if (rowFilt.cat === 'brand' || rowFilt.cat === 'address') {
                    const filterFunction = (row) => {
                        const category = {
                            brand: row.brand,
                            address: row.address,
                        }
                        return category[rowFilt.cat].toLowerCase().includes(rowFilt.val.toLowerCase());
                
                    }
                    tempArray = tempArray.filter(filterFunction)
                    
                } else if (rowFilt.cat==='date'){
                    const filterFunction = (row) => {

                        return Date.parse(row.date) >= Date.parse(rowFilt.val);
                
                    }
                    tempArray = tempArray.filter(filterFunction)

                };
            };
            
        });
        setView(tempArray)
        
    };

    useEffect(() => {
        fetchFuels(1);
    },[]); //acts as component did mount, only executes once on launch

    
    return (
        <ApiContext.Provider value = { fuelview }>
        <UpdateContext.Provider value = { changeFilter }>
        <SearchContext.Provider value = { searchCat }>
        <UpdateSearchContext.Provider value = {changeSearchCat}>
        <UpdateDateContext.Provider value = { changeDateScope }>
            { children }
        </UpdateDateContext.Provider>
        </UpdateSearchContext.Provider>
        </SearchContext.Provider>
        </UpdateContext.Provider>
        </ApiContext.Provider>
    );

}


  export { ApiProvider, useApiContext, useUpdateContext, useSearchContext, useUpdateSearchContext,
             useUpdateDateContext }