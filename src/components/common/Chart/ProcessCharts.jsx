import React from 'react';
import Chart from 'react-apexcharts';
import './pieChar.css'
const ProgressCharts = () => {
  const progressOptions1 = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    labels: ['Progress'],
  };

  const progressSeries1 = [70]; 




  return (
    <div className="pie-charts-container">
      <div className="chart">
        <Chart options={progressOptions1} series={progressSeries1} type="radialBar" width="200" />
      </div>
    </div>
  );
};

export default ProgressCharts;
