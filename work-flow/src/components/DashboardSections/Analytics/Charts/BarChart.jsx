import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
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
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;