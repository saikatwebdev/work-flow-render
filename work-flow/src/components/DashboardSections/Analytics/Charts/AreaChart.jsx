import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const AreaChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9CA3AF', // Gray-400 for legend text
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid for dark background
        },
        ticks: {
          color: '#9CA3AF', // Gray-400 for axis labels
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid for dark background
        },
        ticks: {
          color: '#9CA3AF', // Gray-400 for axis labels
        },
      },
    },
    fill: true,
  };

  return (
    <div className="h-64">
      <Line options={options} data={data} />
    </div>
  );
};

export default AreaChart;