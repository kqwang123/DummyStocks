import React, { useEffect, useState } from 'react';
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
    searchStockArticles: (symbol: string) => void;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data, searchStockArticles }) => {
    const [clickedPointIndex, setClickedPointIndex] = useState<number | null>(null);

    useEffect(() => {
        setClickedPointIndex(null); // Reset the selected point when the data changes
    }, [data]);

    // Chart.js configuration for the scatter plot
    const chartData = {
        datasets: [
            {
                label: 'Companies',
                data: data,
                backgroundColor: (context: any) => {
                    // If the point is clicked, turn it yellow; otherwise, keep it the original color
                    const isClicked = context.dataIndex === clickedPointIndex;
                    return isClicked ? 'yellow' : 'rgba(75, 192, 192, 1)';
                },
                pointRadius: 10, // Size of the scatter points
                hoverRadius: 13
            },
        ],
    };

    const options = {
        responsive: true,
        onClick: (e: any, elements: any[]) => {
            if (elements.length > 0) {
                const clickedIndex = elements[0].index;
                // If the clicked point is already the selected one, reset the selection
                if (clickedIndex === clickedPointIndex) {
                    setClickedPointIndex(null); // Deselect the point
                } else {
                    setClickedPointIndex(clickedIndex); // Select the new point
                    searchStockArticles(data[clickedIndex].symbol);
                }
            }
        },
        plugins: {
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
            <Scatter data={chartData} options={options} />
        </div>
    );
};

export default ScatterPlot;
