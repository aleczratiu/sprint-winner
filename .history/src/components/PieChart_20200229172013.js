import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

function PieChart({ data }) {
    console.log('data', data);
    let 
    for (let [k, v] of data) {

    }
    return (
        <Paper>
            <Chart
                data={data}
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
