import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
import { useGraphContext } from './api_fetcher.js'

// https://www.fusioncharts.com/fusiontime/examples/plotting-multiple-series-on-time-axis?framework=react
// fusion charts is so annoying to use
ReactFC.fcRoot(FusionCharts, TimeSeries);

function Chart() {
    const linedata = useGraphContext();//fuel data
    const schema = [{
        name: "Time",
        type: "date",
        format: "%Y-%m-%d"
      }, {
        name: "Fuel Station",
        type: "string"
      }, {
        name: "Price",
        type: "number"
      }]
    console.log(linedata) 
    const fusionTable = new FusionCharts.DataStore().createDataTable(
        linedata,
        schema
      );
    const dataSource =  {
        chart: {},
        caption: {text: "Fuel Prices for each day"},
        subCaption: {text: "See how much the fuel prices change day to day"},
        series: "Type",
        yaxis: [
            {
              plot: "Cents per Litre",
              title: "c/L",
              format: {
                suffix: "c/L"
              }
            }
          ],
        data: fusionTable
    };
    
    const timeseries = {
        type: "timeseries",
        renderAt: "container",
        width: "600",
        height: "400",
        dataSource
    };
    console.log(timeseries)
    return (
        <ReactFC {...timeseries} />

    )
}


export default Chart;