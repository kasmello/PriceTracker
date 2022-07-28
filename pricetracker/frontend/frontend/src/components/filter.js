import React, { useState, createContext, useContext, useEffect } from 'react';
import { useApiContext, editDateScope } from './api_fetcher';

const EditDate = createContext();
const EditString = createContext();
const EditCat = createContext();
const EditDup = createContext();
const TimeView = createContext()
const CatView = createContext()
const SearchView = createContext()
const FilteredData = createContext();
const FuelSelect = createContext();
const EditFuelSelect = createContext();

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

function useTimeView() {
    return useContext(TimeView)
}

function useCatView() {
    return useContext(CatView)
}

function useSearchView() {
    return useContext(SearchView)
}

function useEditDup() {
    return useContext(EditDup)
}

function useFuelSelect() {
    return useContext(FuelSelect)
}

function useEditSelect() {
    return useContext(EditFuelSelect)
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

function FuelSelectProvider({ children }){
    const [fuelSelected, changeSelected] = useState([])

    const editSelected = (newarray) => {
        changeSelected(newarray)
    }

    return (
        <FuelSelect.Provider value = {fuelSelected}>
        <EditFuelSelect.Provider value = {editSelected}>
            { children }
        </EditFuelSelect.Provider>
        </FuelSelect.Provider>
    )
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

    const editCat = () => {
        setCat(catFilter == 'brand' ? 'address' : 'brand')
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
        <TimeView.Provider value={ dateFilter }>
        <CatView.Provider value={ catFilter }>
        <SearchView.Provider value={ stringFilter }>
            { children }
        </SearchView.Provider>
        </CatView.Provider>
        </TimeView.Provider>
        </EditDate.Provider>
        </EditString.Provider>
        </EditCat.Provider>
        </EditDup.Provider>
        </FilteredData.Provider>

    )
}

export { FilterProvider, useEditDate, useEditCat, useEditDup, useEditString, getFilteredData,
        useTimeView, useCatView, useSearchView, FuelSelectProvider, useFuelSelect, useEditSelect }