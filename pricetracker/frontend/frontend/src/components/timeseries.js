import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import MSLine from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getFilteredData } from './filter';

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
    let temp_arr = {"category":[]};
    while (Date.parse(date) <= Date.parse(curr)) {
        let temp_object = {'label': date}
        temp_arr.category.push(temp_object)
        date = incrementDate(date)

    }
    return temp_arr
}

const tableData = (filter) => {
    const fuelprices = getFilteredData();//fuel data
    var fueldata = [];
    const filtdate = filter[1].val
    const currdate = getDate(0)
    const dates = getAllDatesTilCurr(filtdate, currdate)
    return dates

}


function Chart() {
    const fueldata = tableData();//fuel data

    const chartConfigs =  {
        type: "line", // The chart type
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
        data: []
        }
    };


    return (
        <div>
            <ReactFC {...chartConfigs} />
            <a href="">test</a>
        </div>
    )
}


export default Chart;