import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

function PieChart({ data }) {
    let chartData = [];
    for (let [k, v] of data) {
        chartData.push({name: k, vote: v, });
    }


    console.log('chartData', chartData)
    return (
        <Paper>
            <Chart
                data={chartData}
            >
                <PieSeries
                    name="alex"
                    valueField="vote"
                    argumentField="name"
                />
            </Chart>
        </Paper>
    );
}

export default PieChart;
