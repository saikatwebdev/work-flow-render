import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
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
  };

  return (
    <div className="h-64 bg-black"> {/* Dark mode background */}
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default DoughnutChart;