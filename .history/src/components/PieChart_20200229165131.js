import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

function PieChart({ data }) {
    const { data: chartData } = this.state;

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
