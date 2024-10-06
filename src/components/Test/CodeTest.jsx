import { useState } from 'react';
import Chart from 'react-apexcharts'
import ReactStars from "react-rating-stars-component";


function CodeTest() {
  const[data, setData] = useState({
    series: [{
      name : 'Sales',
      data : [10,20,30,40]
    },
    {
      name : 'Code',
      data: [33,44,22, 12]
    }
    ],
    options : {
      chart: {
        height :350,
        type : 'bar',
        toolbar : {
          show : false
        },
      },
      markets : {
        size :4
      },
      color : ['#FFFF', '#000000'],
      fill : {
        type : 'gradient',
        gradient :{
         
          stops: [0,90,100]
        },
      },
      dataLabels : {
        enable: false,
      },
      stroke : {
        curve : 'smooth',
        width: 2,
      },
      xaxis: {
        type: 'datatime',
        categories: [
          '2018-09-19T00:00.00.000Z'
        ],
      },
      tooltip: {
        x: {
          format:'dd/MM/yy HH:mm' 
        },
      },

    } 

  })
  return (
    <Chart
    options={data.options}
    series={data.series}
    type={data.options.chart.type}
    height={data.options.chart.height}
  
  
  />
  )
}


export default CodeTest