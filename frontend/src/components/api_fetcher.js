//use function with usestate/useeffect hook
import React, { useState, createContext, useContext, useEffect } from 'react';
import { parseDate } from "fusioncharts/utils" 

const ApiContext = createContext(); 
const ChangeDateMode = createContext();
const ChangeProduct = createContext()
const GraphContext = createContext()
const EditPlaceSelect = createContext();


function useApiContext() {
    return useContext(ApiContext)
}

function changeDateMode(){
    return useContext(ChangeDateMode)
}

function changeProduct(){
    return useContext(ChangeProduct)
}


function useGraphContext() {
    return useContext(GraphContext)
}



function editPlaceSelect() {
    return useContext(EditPlaceSelect)
}

const neo4j = require("neo4j-driver");
const uri = process.env.REACT_APP_URI
const usr = process.env.REACT_APP_USR
const password = process.env.REACT_APP_PASSWORD
const driver = neo4j.driver(uri, neo4j.auth.basic(usr, password));



function ApiProvider({ children, dataMode, dataView }) {
    const [dateMode, setDateMode] = useState('tdy');
    const [product, setProduct] = useState('UnleadedPetrol')
    const [fuelprices, setPrices] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [placeSelect, setPlaceSelect] = useState([]);
    
    const getDate = (num) => {
        const date = new Date();
        date.setDate(date.getDate()-num);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`
        
    }

    const linkGeneratorPlace = () => {
        return `MATCH (b:Brand)-->(p:Place)<--(l:Location)
        RETURN b.brand AS brand,p.address AS address,l.location AS location`

    }

    const linkGeneratorGraph = (addressList, product) => {
        addressList.forEach((address) => {
            return `MATCH (b:Brand)-->(p:Place)<--(l:Location)
            WHERE p.address = '${address}'
            MATCH (d:DATE_${product})-[pr:PRICED_AT]->(p:Place)
            RETURN b.brand AS brand,l.location AS location
            ,pr.price AS price,d.date AS date`
        })
        
    }


    const linkGenerator = (dateStr,product) => {
        // date can be tdy, tmr, or all
        //product is 98ERON, E85, UnleadedPetrol
        var date = ''
        var sign = '='
        switch (dateStr) {
            case 'tdy':
                date = getDate(0);
                break;
            case 'tmr':
                date = getDate(-1);
                break;
            default:
                date=getDate(30);
                sign = '>'
        };
        console.log(`Date: ${date}`)
        return `MATCH (d:DATE_${product})-[pr:PRICED_AT]->(p:Place)
        WHERE d.date ${sign} '${date}'
        MATCH (b:Brand)-->(p:Place)<--(l:Location)
        RETURN b.brand AS brand,p.address AS address,p.phone AS phone,p.description AS description,l.location AS location
        ,pr.price AS price,d.date AS date`

    }

    const changePlaceSelect = (item=null) => {
        if (item !== null) {
            setPlaceSelect(item)
        }
        return placeSelect
    }


    const fetchFuels = async (link) => {
        const session = await driver.session();
        const result = await session.run(link)
        await setPrices(result.records.map(record => {
            var newRecord = record.toObject()
            newRecord['price'] = parseFloat(newRecord['price'])
            return newRecord
        }))
        await session.close()
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
    

    // fetchFuels(1);
    useEffect(() => {
        console.log('Data Reloaded')
        if (dataView==='graph') {
            fetchFuels(linkGeneratorGraph(placeSelect,))
        } else if (dataMode==='multiple') {
            fetchFuels(linkGeneratorPlace())
        } else{
            fetchFuels(linkGenerator(dateMode,product))
        }
        // then(link => fetchFuels(link))
       
    },[dataMode,product,dateMode, dataView]); //acts as component did mount, only executes once on launch

    
    return (
        <ApiContext.Provider value = { fuelprices }>
        <ChangeDateMode.Provider value = { setDateMode }>
        <ChangeProduct.Provider value = { setProduct }>
        <GraphContext.Provider value = {graphData}>
        <EditPlaceSelect.Provider value={changePlaceSelect}>
            { children }
        </EditPlaceSelect.Provider>
        </GraphContext.Provider>
        </ChangeProduct.Provider>
        </ChangeDateMode.Provider>
        </ApiContext.Provider>
    );

}


  export { ApiProvider, useApiContext, changeDateMode, changeProduct, useGraphContext, editPlaceSelect }
