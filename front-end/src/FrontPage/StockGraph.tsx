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
        label: 'Scatter Plot',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 1)', // Color for the points
        pointRadius: 5, // Size of the scatter points
      },
    ],
  };

  return (
    <div>
      <h2>Scatter Plot</h2>
      <Scatter data={chartData} />
    </div>
  );
};

export default ScatterPlot;
