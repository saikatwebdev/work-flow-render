import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
  Legend
);

const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#255F38', // Dark mode text color for legend
        },
      },
      tooltip: {
        backgroundColor: '#1F7D53', // Dark mode tooltip background
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#255F38',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#255F38', // Dark mode grid color
        },
        ticks: {
          color: '#255F38', // Dark mode tick labels
        },
      },
      x: {
        grid: {
          color: '#255F38', // Dark mode grid color
        },
        ticks: {
          color: '#255F38', // Dark mode tick labels
        },
      },
    },
  };

  return (
    <div className="h-64 bg-black"> {/* Dark mode background */}
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;