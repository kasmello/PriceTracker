import React, { useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import MSLine from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getFilteredData, useFuelSelect } from './filter';
import { useApiContext, editDateScope } from './api_fetcher.js'

ReactFC.fcRoot(FusionCharts, MSLine, FusionTheme);

const getDate = (num) => {
    const date = new Date();
    date.setDate(date.getDate()-num);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`
}

const incrementDate = (date) => {
    const new_date = new Date(date)
    new_date.setDate(new_date.getDate()+1);
    const day = new_date.getDate();
    const month = new_date.getMonth() + 1;
    const year = new_date.getFullYear();
    return `${year}-${month}-${day}`
}

const getAllDatesTilCurr = (date, curr) => {
    let x = {category:[]};
    while (Date.parse(date) <= Date.parse(curr)) {
        let temp_object = {label: date}
        x.category.push(temp_object)
        date = incrementDate(date)
    }
    return x
}



const convertToTimeSeries = (address, x, allData) => {
    const filterByAddress = (row) => {
        return address==row.address
    }
    var timeseriesData = allData.filter(filterByAddress)
    console.log(allData.filter(filterByAddress))
    timeseriesData.sort((a, b) => {
        let da = new Date(a.date).setHours(0, 0, 0, 0), //rounds to nearest date
            db = new Date(b.date).setHours(0, 0, 0, 0);
        return db - da;  
    }) 
    var j = 0
    var oldPrice = 0
    var y = []
    
    timeseriesData.forEach(row => {
        let match = false
        while (!match) {
            if (Date.parse(row.date)===Date.parse(x.category[j].label)) {      
                oldPrice = row.price
                match = true
            } 
            y.push({value: oldPrice})
            j++;
            console.log(row.date + x.category[j].label)
            if (j >= x.category.length) {match = true}
        }

    })

}

const getAllAddresses = () => {
    const selectedIndex = useFuelSelect();
    const filterfunc = getFilteredData()
    const filteredData = filterfunc()
    const allSelectedAddresses = selectedIndex.map(num => {
        return filteredData[num].address
    })
    return allSelectedAddresses
};



function Chart() {
    const linedata = [];//fuel data
    const changeDateScope = editDateScope();
    var allData = []
    
    useEffect(() => {
        const changeScopeToThirtyDays = async () => {
            allData = await changeDateScope(30)
        }
        changeScopeToThirtyDays().catch(console.error)
    },[]);
    
    const thirty_days_ago = getDate(30), today = getDate(0)
    const x = getAllDatesTilCurr(thirty_days_ago, today)
    const addresses = getAllAddresses()
    const timeSeriesData = addresses.map(address => {
        convertToTimeSeries(address, x, allData)
    })
    const chartConfigs =  {
        type: "msline", // The chart type
        width: "700", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
        // Chart Configuration
        chart: {
            caption: "Fuel Price Time Series",    //Set the chart caption
            subCaption: "Historical fuel prices for given dates",             //Set the chart subcaption
            xAxisName: "Date",           //Set the x-axis name
            yAxisName: "Price",  //Set the y-axis name
            theme: "fusion"                 //Set the theme for your chart
        },
        // Chart Data - from step 2
        data: linedata
        }
    };


    return (
        <div>
            <ReactFC {...chartConfigs} />
        </div>
    )
}


export default Chart;