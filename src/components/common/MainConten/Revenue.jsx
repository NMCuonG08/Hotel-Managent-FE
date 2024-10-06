import { useState } from 'react';
import Chart from 'react-apexcharts';

const Revenue = () => {
    const [years,setYears] = useState([
        "2018-01-01T00:00:00.000Z"
      ])
    
  const [data, setData] = useState({
    series: [{
      name: 'Revenue',
      data: [10, 20, 30, 40, 10, 10, 10, 10, 10, 10, 10, 10]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area', // Đổi từ 'area' sang 'line'
        toolbar: {
          show: false
        },
        offsetY: 20,
      },
      title: {
        text: 'Revenue Chart', // Tiêu đề biểu đồ
        align: 'left', // Căn trái
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#263238',
        },
        offsetY: 0,
        offsetX: 20
      },
      markers: {
        size: 5
      },
      colors: ['rgb(5, 141, 95)'], // Chỉ cần một màu cho một series
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-01-01T00:00:00.000Z',
          '2018-02-01T00:00:00.000Z',
          '2018-03-01T00:00:00.000Z',
          '2018-04-01T00:00:00.000Z',
          '2018-05-01T00:00:00.000Z',
          '2018-06-01T00:00:00.000Z',
          '2018-07-01T00:00:00.000Z',
          '2018-08-01T00:00:00.000Z',
          '2018-09-01T00:00:00.000Z',
          '2018-10-01T00:00:00.000Z',
          '2018-11-01T00:00:00.000Z',
          '2018-12-01T00:00:00.000Z'
        ],
        labels: {
          formatter: function(value) {
            const date = new Date(value);
            return date.toLocaleString('default', { month: 'short' }); // Hiển thị tháng
          }
        },
        title: {
            text: `Year ${new Date(years[0]).getFullYear()}` 
          }
      },
      yaxis: {
        min: 0, // Đặt giá trị tối thiểu của trục y là 0
        title: {
          text: 'Revenue'
        }
      }
    }
  });

  return (
    <div style={{ margin: '20px' }}>
      <Chart
        options={data.options}
        series={data.series}
        type={data.options.chart.type}
        height={data.options.chart.height}
        style={{backgroundColor: 'white', marginTop:'50px' , borderRadius : '20px'  }}
      />
    </div>
  );
}

export default Revenue;
