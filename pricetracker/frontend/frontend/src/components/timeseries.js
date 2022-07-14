import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import MSLine from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useApiContext } from './api_fetcher.js';

ReactFC.fcRoot(FusionCharts, MSLine, FusionTheme);

const tableData = () => {
    const fuelprices = useApiContext();//fuel data
    var fueldata = [];
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