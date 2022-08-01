//use function with usestate/useeffect hook
import React, { useState, createContext, useContext, useEffect } from 'react';
import { parseDate } from "fusioncharts/utils" 

const ApiContext = createContext(); 
const ChangeDateScope = createContext();
const GraphContext = createContext()
const ChangeGraph = createContext()
const PlaceSelect = createContext();
const EditPlaceSelect = createContext();

function useApiContext() {
    return useContext(ApiContext)
}

function editDateScope() {
    return useContext(ChangeDateScope)
}

function useGraphContext() {
    return useContext(GraphContext)
}

function useEditGraph() {
    return useContext(ChangeGraph)
}

function usePlaceSelect() {
    return useContext(PlaceSelect)
}

function editPlaceSelect() {
    return useContext(EditPlaceSelect)
}


function ApiProvider({ children }) {

    const [fuelprices, setPrices] = useState([]);
    const [maxFilter, setMax] = useState(1)
    const [graphData, setGraphData] = useState([])
    const [placeSelect, setPlaceSelect] = useState([])

    const getDate = (num) => {
        const date = new Date();
        date.setDate(date.getDate()-num);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`
    }

    // const changeDateForFusion = (date) => {
    //     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    //         ];
    //     var d = new Date(date)
    //     const day = d.getDate();
    //     const month = monthNames[d.getMonth()];
    //     const year = d.getFullYear();
    //     return `${day}-${month}-${year}`
    // }

    const changePlaceSelect = (num_list) => {
        setPlaceSelect(num_list)
    }


    const getDateLink = (num) => {
        const date = getDate(num)
        const date_string = (`http://127.0.0.1:8000/api/price/from=${date}/`)
        console.log(`Fetching from ${date_string}`)
        return date_string
    };

    const changeDateScope = (num) => {          
        const checkIfReloadNeeded = (old_num, new_num) => {
            if (parseInt(new_num) > parseInt(old_num)) {
                console.log('Client does not have data for ' + new_num + ' days ago, fetching...')
                fetchFuels(new_num)
                setMax(new_num)
            } 
        }
        checkIfReloadNeeded(maxFilter, num)
    }

    const fetchFuels = (num) => {
            fetch(getDateLink(num))
            .then(response => response.json()) //converts data
            .then(json => {
                setPrices(json)
            }) 
        };

    const getPlaceLink = (num) => {
        const place_string = (`http://127.0.0.1:8000/api/price/address_id=${num}/`)
        console.log(`Fetching from ${place_string}`)
        return place_string
    }

    const fetchPlacePrices = async () => {
        const getAllPrices = () => {
            return Promise.all(placeSelect.map(num => {
                return fetch(getPlaceLink(num))
                .then(response => response.json())
            })) 
        }
        var x = await getAllPrices()
        var final_array = []
        x.forEach(company => {
            company.forEach(row => {
                final_array.push([parseDate(row.date, '%Y-%m-%d'), (`${row.brand} - ${row.address}`), row.price])
            })
        })
        console.log(final_array)
        setGraphData(final_array)

    };


    useEffect(() => {
        fetchFuels(1);
    },[]); //acts as component did mount, only executes once on launch

    
    return (
        <ApiContext.Provider value = { fuelprices }>
        <ChangeDateScope.Provider value = { changeDateScope }>
        <GraphContext.Provider value = {graphData}>
        <ChangeGraph.Provider value = {fetchPlacePrices}>
        <PlaceSelect.Provider value={placeSelect}>
        <EditPlaceSelect.Provider value={changePlaceSelect}>
            { children }
        </EditPlaceSelect.Provider>
        </PlaceSelect.Provider>
        </ChangeGraph.Provider>
        </GraphContext.Provider>
        </ChangeDateScope.Provider>
        </ApiContext.Provider>
    );

}


  export { ApiProvider, useApiContext, editDateScope, useGraphContext, useEditGraph, usePlaceSelect, editPlaceSelect }
