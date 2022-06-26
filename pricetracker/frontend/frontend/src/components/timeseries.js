import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import MSLine from "fusioncharts/fusioncharts.charts";
import { useApiContext, useUpdateContext } from './api_fetcher.js';

ReactFC.fcRoot(FusionCharts, MSLine, FusionTheme);

const fuelprices = useApiContext();//fuel array
const fetchFuels = useUpdateContext();//function to update fuels

//json object to store chart configuration

const chartConfigs = {
    type: "msline", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
        chart: {
            caption: "Countries With Most Oil Reserves [2017-18]",    //Set the chart caption
            subCaption: "In MMbbl = One Million barrels",             //Set the chart subcaption
            xAxisName: "Country",           //Set the x-axis name
            yAxisName: "Reserves (MMbbl)",  //Set the y-axis name
            numberSuffix: "K",
            theme: "fusion"                 //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: fuelprices
    
    }
};