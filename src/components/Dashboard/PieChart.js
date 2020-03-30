import * as React from 'react';
import Chart from 'react-google-charts';

const pieOptions = {
    title: '',
    pieHole: 0.6,
    slices: [
        {
            color: '#2BB673',
        },
        {
            color: '#d91e48',
        },
        {
            color: '#007fad',
        },
        {
            color: '#e9a227',
        },
    ],
    legend: {
        position: 'bottom',
        alignment: 'center',
        textStyle: {
            color: '233238',
            fontSize: 14,
        },
    },
    tooltip: {
        showColorCode: true,
    },
    chartArea: {
        left: 0,
        top: 0,
        width: '100%',
        height: '80%',
    },
    fontName: 'Roboto',
};
function PieChart({ data }) {
    const viewData = [['Nume', 'Voturi']];
    for (const [k, v] of data) {
        viewData.push([k, v]);
    }

    return (
        <div color="inherit" className="App">
            <Chart
              chartType="PieChart"
              data={viewData}
              options={pieOptions}
              graph_id="PieChart"
              width="100%"
              height="400px"
              legend_toggle
            />
        </div>
    );
}


export default PieChart;
