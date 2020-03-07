import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

function PieChart({ data }) {
    console.log('data', data);
    let viewData = [];
    for (let [k, v] of data) {
        viewData.push({name: k, vote: v, votes: v });
    }
    return (
        <Paper>
            <Chart
                data={data}
            >
                <PieSeries
                innerRadius="votes"
                valueField="area"
                argumentField="country"
                />
            </Chart>
        </Paper>
    );
}

export default PieChart;
