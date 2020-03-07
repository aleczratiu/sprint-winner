import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

function PieChart({ data }) {
    let viewData = [];
    for (let [k, v] of data) {
        viewData.push({name: k, vote: v});
    }


    console.log('viewData', viewData)
    return (
        <Paper>
            <Chart
                data={viewData}
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
