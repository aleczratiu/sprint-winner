import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';

import { Stack } from '@devexpress/dx-react-chart';

const styles = {
  titleText: {
    textAlign: 'left',
  },
};

const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.titleText} />
));

const stacks = [
  { series: ['👶 Young', '🧑 Adult', '🧓 Old'] },
];

function Chart({ data }) {

return (
    <Paper>
    <Chart
        data={chartData}
    >
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
        name="👶 Young"
        valueField="young"
        argumentField="state"
        />
        <BarSeries
        name="🧑 Adult"
        valueField="middle"
        argumentField="state"
        />
        <BarSeries
        name="🧓 Old"
        valueField="older"
        argumentField="state"
        />
        <Stack
        stacks={stacks}
        />
        <Title text="👪 Population" textComponent={TextComponent} />
        <Legend />
    </Chart>
    </Paper>
);
}

export default Chart;
