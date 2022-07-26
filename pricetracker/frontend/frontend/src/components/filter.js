import React, { useState, createContext, useContext, useEffect } from 'react';
import { useApiContext, editDateScope } from './api_fetcher';

const EditDate = createContext();
const EditString = createContext();
const EditCat = createContext();
const GetCat = createContext();
const EditDup = createContext();
const FilteredData = createContext();

function getFilteredData() {
    return useContext(FilteredData)
}

function useEditDate() {
    return useContext(EditDate)
}

function useEditString() {
    return useContext(EditString)
}

function useEditCat() {
    return useContext(EditCat)
}

function useGetCat() {
    return useContext(GetCat)
}

function useEditDup() {
    return useContext(EditDup)
}

function rmDuplicates(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item.address) ? false : (seen[item.address] = true);
    });
}

const getDate = (num) => {
    const date = new Date();
    date.setDate(date.getDate()-num);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`
}

function FilterProvider({ children }) {
    const [dateFilter, setDate] = useState(1);
    const [stringFilter, setString] = useState('');
    const [catFilter, setCat] = useState('brand');
    const [removeDuplicates, setRemove] = useState(false);

    const editDate = (num) => {
        setDate(num)
    }

    const editString = (string) => {
        setString(string)
    }

    const editCat = (string) => {
        setCat(string)
    }

    const editRemove = () => {
        setRemove(!removeDuplicates)
    }

    const filterData = () => {
        var fuelprices = useApiContext()
        var changeDateScope = editDateScope()
        const stringFilterFunction = (row) => {
            const category = {
                brand: row.brand,
                address: row.address,
            }
            return category[catFilter].toLowerCase().includes(stringFilter.toLowerCase());
    
        }
        fuelprices = fuelprices.filter(stringFilterFunction)
        if (removeDuplicates) {
            var new_date = getDate(1)
            var dateFilterFunction = (row) => {
                const rowdate = new Date(row.date).setHours(0, 0, 0, 0)
                const filtdate = new Date(new_date).setHours(0, 0, 0, 0)
                return rowdate >= filtdate;
            }
            fuelprices = fuelprices.filter(dateFilterFunction)
            fuelprices = rmDuplicates(fuelprices)
        } else {
            if (dateFilter != 1) {
                changeDateScope(dateFilter)
            }   
            var new_date = getDate(dateFilter)  
            var dateFilterFunction = (row) => {
                const rowdate = new Date(row.date).setHours(0, 0, 0, 0)
                const filtdate = new Date(new_date).setHours(0, 0, 0, 0)
                return rowdate >= filtdate;
            }
            fuelprices = fuelprices.filter(dateFilterFunction)
        }
        return fuelprices
    };
    return (
        <FilteredData.Provider value = { filterData }>
        <EditDup.Provider value = { editRemove }>
        <EditCat.Provider value = { editCat }>
        <EditString.Provider value = { editString }>
        <EditDate.Provider value = { editDate }>
        <GetCat.Provider value = { catFilter }>
            { children }
        </GetCat.Provider>
        </EditDate.Provider>
        </EditString.Provider>
        </EditCat.Provider>
        </EditDup.Provider>
        </FilteredData.Provider>

    )
}

export { FilterProvider, useEditDate, useEditCat, useEditDup, useEditString, getFilteredData, useGetCat }