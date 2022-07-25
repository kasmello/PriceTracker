//use function with usestate/useeffect hook
import React, { useState, createContext, useContext, useEffect } from 'react';

const ApiContext = createContext(); 
const UpdateContext = createContext();
const SearchContext = createContext();
const UpdateSearchContext = createContext();
const UpdateDateContext = createContext();
const UseFilter = createContext();
const RemoveDuplicates = createContext();

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

function useFilter() {
    return useContext(UseFilter)
}

function useRemoveDuplicates() {
    return useContext(RemoveDuplicates)
}


function ApiProvider({ children }) {

    const [fuelprices, setPrices] = useState([]);
    const [fuelview, setView] = useState([]);
    const [removeDuplicates, setRemoveDuplicates] = useState(false);
    const [searchCat, changeCat] = useState('brand');

    const changeRemoveDuplicates = () => {
        function changeDuplicates() {
            setRemoveDuplicates(!removeDuplicates)
            return Promise.resolve()
        }
        changeDuplicates().then(() => filterData(fuelprices))
        
    }

    const getDate = (num) => {
        const date = new Date();
        date.setDate(date.getDate()-num);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`
    }

    const [filterArray, setFilter] = useState([{
                            'cat': 'brand',
                            'val': ''
                                },
                        {
                            'cat': 'date',
                            'val': getDate(1),
                        }]);
    const getLink = (num) => {
        const date = getDate(num)
        console.log(`Fetching from http://127.0.0.1:8000/api/price/from=${date}/...`)
        return `http://127.0.0.1:8000/api/price/from=${date}/`
    };

    const changeDateScope = (num) => {  
        const grabEarliestDate = () => {
            const earliest_date = getDate(num)
            fuelprices.sort((a, b) => {
                let da = new Date(a.date).setHours(0, 0, 0, 0), //rounds to nearest date
                    db = new Date(b.date).setHours(0, 0, 0, 0);
                return da - db;  
            })  
            return Promise.resolve([fuelprices[0].date, earliest_date])
        };
        
        const checkIfReloadNeeded = ([old_date, new_date]) => {
            let oldd = new Date(old_date).setHours(0, 0, 0, 0),
                newd = new Date(new_date).setHours(0, 0, 0, 0)
            if (newd < oldd) {
                console.log(newd + ' ' + oldd)
                console.log('Client does not have data for ' + new_date + ', fetching...')
                fetchFuels(num)
            }
            
            return Promise.resolve(new_date);
        }
        grabEarliestDate().then(([old_date, new_date]) => checkIfReloadNeeded([old_date, new_date]))
                        .then((date) => changeFilter([1, {
                            'cat': 'date',
                            'val': date
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
        console.log('lol')
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
                        const rowdate = new Date(row.date).setHours(0, 0, 0, 0)
                        if (!removeDuplicates) {
                            var filtdate = new Date(rowFilt.val).setHours(0, 0, 0, 0)
                            console.log(removeDuplicates)
                        } else { 
                            const date = new Date();
                            date.setDate(date.getDate()-1);
                            var filtdate = date.setHours(0,0,0,0);
                            console.log(removeDuplicates)
                        }
                        return rowdate >= filtdate;
                
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
        <UpdateSearchContext.Provider value = { changeSearchCat }>
        <UpdateDateContext.Provider value = { changeDateScope }>
        <UseFilter.Provider value = { filterArray }>
        <RemoveDuplicates.Provider value = { changeRemoveDuplicates }>
            { children }
        </RemoveDuplicates.Provider>
        </UseFilter.Provider>
        </UpdateDateContext.Provider>
        </UpdateSearchContext.Provider>
        </SearchContext.Provider>
        </UpdateContext.Provider>
        </ApiContext.Provider>
    );

}


  export { ApiProvider, useApiContext, useUpdateContext, useSearchContext, useUpdateSearchContext,
             useUpdateDateContext, useFilter, useRemoveDuplicates }