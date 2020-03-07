import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

function PieChart({ data }) {
    let chartData = [
  { country: 'Russia', area: 12 },
  { country: 'Canada', area: 7 },
  { country: 'USA', area: 7 },
  { country: 'China', area: 7 },
  { country: 'Brazil', area: 6 },
  { country: 'Australia', area: 5 },
  { country: 'India', area: 2 },
  { country: 'Others', area: 55 },
];
    // for (let [k, v] of data) {
    //     chartData.push({name: k, vote: v});
    // }


    console.log('chartData', chartData)
    return (
        <Paper>
            <Chart
                data={chartData}
            >
                <PieSeries
                valueField="area"
                argumentField="country"
                />
            </Chart>
        </Paper>
    );
}

export default PieChart;
