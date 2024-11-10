import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ScatterPlotProps {
  data: { x: number, y: number, symbol: string }[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
  // Chart.js configuration for the scatter plot
  const chartData = {
    datasets: [
      {
        label: 'Companies',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 1)', // Color for the points
        pointRadius: 10, // Size of the scatter points
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'linear', // Use linear scale for x-axis
        position: 'bottom',
      },
      y: {
        type: 'linear', // Use linear scale for y-axis
        position: 'left',
      },
    },
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        callbacks: {
          // Customize the tooltip
          label: (tooltipItem: any) => {
            const symbol = tooltipItem.raw.symbol;  // Get the symbol from the data point
            const revenue = tooltipItem.raw.y; // Get the revenue from the data point
            const formattedRevenue = new Intl.NumberFormat().format(revenue);
            return `Symbol: ${symbol}, Revenue: \$${formattedRevenue}`;
          }
        }
      }
    },
  };

  return (
    <div>
      <h2>Scatter Plot</h2>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default ScatterPlot;
