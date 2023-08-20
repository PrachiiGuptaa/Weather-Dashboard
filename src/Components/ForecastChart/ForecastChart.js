import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { format, parseISO } from 'date-fns';
import './ForecastChart.css';

const ForecastChart = ({ forecast }) => {
  // Formatting forecast data for the chart
  const chartLabels = forecast.map(item => format(parseISO(item.dt_txt), 'hh:mm a'));
  const chartTemperatures = forecast.map(item => item.main?.temp);

  const maxLabels = 8;
  const step = Math.max(1, Math.floor(chartLabels.length / maxLabels));
  const scaledLabels = chartLabels.filter((_, index) => index % step === 0);

  const chartOptions = {
    chart: {
      toolbar: {
        show: false, // Hiding the chart toolbar
      },
    },
    xaxis: {
      categories: scaledLabels,
      title: {
        text: 'Time',
      },
    },
    yaxis: {
      title: {
        text: 'Temperature (°C)',
      },
    },
    stroke: {
      curve: 'smooth', 
      width: 2, 
    },
  };

  const chartSeries = [
    {
      name: 'Temperature (°C)',
      data: chartTemperatures,
    },
  ];

  return (
    <div className='chart-container'>
    <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={300} width={600} />
    </div>
  );
};

export default ForecastChart;