import React from 'react'
import Plot from 'react-plotly.js';


 const CountryLineChart = props =>
{
    /*
        expect to get the following 
        label data
        country_data
        country name
        label

    */

    console.log(props)

    const labels = props.labels
    const country_data = props.country_data.totals

    return (
        <>
            <Plot data = {[
                {
                    x: labels,
                    y: country_data.Confirmed,
                    type: 'scatter',
                    mode : 'lines+markers',
                    marker: {color : 'red'},
                },
            ]}
            layout = {{width:500, height :600, title: "fancy plot"}}
            />
        </>
    )
}

export default CountryLineChart;