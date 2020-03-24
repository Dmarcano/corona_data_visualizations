import React from 'react'
import Plot from 'react-plotly.js';


export default function LineChart(props)
{
    const data = props.data; 
    // let data = props.data
    return (
        <div>
            <Plot data = {[
                {
                    x: [1, 2, 3, 4, 5],
                    y: [2, 4, 6, 9, 12],
                    type: 'scatter',
                    mode : 'lines+markers',
                    marker: {color : 'red'},
                },
            ]}
            layout = {{width:500, height :600, title: "fancy plot"}}
            />
        </div>
    );

}

