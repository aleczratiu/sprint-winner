import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
// import {
//   Chart,
//   PieSeries,
// } from '@devexpress/dx-react-chart-material-ui';

// function PieChart({ data }) {
//     console.log('data', data);
//     let viewData = [];
//     for (let [k, v] of data) {
//         viewData.push({name: k, vote: v });
//     }
//     return (
//         <Paper>
//             <Chart
//             data={viewData}
//             >
//             <PieSeries
//                 valueField="vote"
//                 argumentField="name"
//             />
//             </Chart>
//         </Paper>
//     );
// }

import Chart from "react-google-charts";

const pieOptions = {
  title: "",
  pieHole: 0.6,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};
function PieChart({ data }) {
    console.log('data', data);
    let viewData = [["Nume", "Voturi"]];
    for (let [k, v] of data) {
        viewData.push([k, v]);
    }

    console.log('viewData', viewData, 'compara', [["Age", "Weight"], ["a", 12], ["b", 5.5]])

    return (
        <div className="App">
        <Chart
            chartType="PieChart"
            data={[["Age", "Weight"], ["a", 12], ["b", 5.5]]}
            options={pieOptions}
            graph_id="PieChart"
            width={"100%"}
            height={"400px"}
            legend_toggle
        />
        </div>
    );
}


export default PieChart;
