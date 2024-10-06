import React from 'react';
import Chart from 'react-apexcharts';
import './pieChar.css'
const PieCharts = () => {
  const pieOptions1 = {
    chart: {
      type: 'pie',
    },
    labels: ['A', 'B', 'C', 'D'],
  };

  const pieSeries1 = [44, 55, 13, 43];

  const pieOptions2 = {
    chart: {
      type: 'pie',
    },
    labels: ['X', 'Y', 'Z'],
  };

  const pieSeries2 = [30, 40, 30];

  return (
    <div className="pie-charts-container">
      <div className="chart">
        <h3>Pie Chart 1</h3>
        <Chart options={pieOptions1} series={pieSeries1} type="pie" width="380" />
      </div>
      <div className="chart">
        <h3>Pie Chart 2</h3>
        <Chart options={pieOptions2} series={pieSeries2} type="pie" width="380" />
      </div>
    </div>
  );
};

export default PieCharts;
