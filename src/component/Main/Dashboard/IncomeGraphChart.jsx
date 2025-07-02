'use client';

import React from 'react';
import { Card } from 'antd';  // Import Ant Design's Card component
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { IoIosMenu } from 'react-icons/io5';

// Registering the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeGraphChart = () => {
  // Sample data for monthly income analysis
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // months
    datasets: [
      {
        label: 'Income',
        data: [3000, 2000, 2500, 3500, 4000, 7000, 5500, 6000, 4500, 4700, 5200, 5000], // income data for each month
        backgroundColor: '#F2E0C9', // Light beige bars
        borderColor: '#dcb66b',
        borderWidth: 1,
        borderRadius: 5, // Rounded bars
        hoverBackgroundColor: 'linear-gradient(to top, #12697b, #fff)', // Hover color
        hoverBorderColor: '#000', // Hover border color
        hoverBorderWidth: 2,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          // Customizing the tooltip to show the value on hover
          title: (tooltipItems) => {
            return 'Income: $' + tooltipItems[0].raw;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Subtle grid lines
        },
        ticks: {
          color: '#fff', // White ticks
        },
      },
      x: {
        grid: {
          display: false, // Remove x-axis grid lines
        },
        ticks: {
          color: '#fff', // White ticks for months
        },
      },
    },
  };

  return (
    <div className="border rounded-lg  text-white">
      <Card
        title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>XYZ Analyses</span>}
        bordered={false}
        style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        extra={
          <div className="flex items-center gap-2 cursor-pointer">
            {/* <IoIosMenu className="text-xl text-gray-500" /> */}
            {/* <span className="text-gray-500">Menu</span> */}
          </div>
        }
      >
        <div className="relative w-full h-80">
          {/* Render the Bar Chart inside Ant Design's Card component */}
          <Bar data={data} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default IncomeGraphChart;