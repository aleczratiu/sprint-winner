import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

function PieChart({ data }) {
    let chartData = [];
    for (let [k, v] of data) {
        chartData.push({name: k, vote: v, winner: k});
    }


    console.log('chartData', chartData)
    return (
        <Paper>
            <Chart
                data={chartData}
            >
                <PieSeries
                    name="winner"
                    valueField="vote"
                    argumentField="name"
                />
            </Chart>
        </Paper>
    );
}

export default PieChart;


import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

let chartData = [];
    for (let [k, v] of data) {
        chartData.push({name: k, vote: v, winner: k});
    }

export default React.createClass({
  displayName: 'DoughnutExample',

  render() {
    return (
      <div>
        <h2>Doughnut Example</h2>
        <Doughnut data={data} />
      </div>
    );
  }
});
