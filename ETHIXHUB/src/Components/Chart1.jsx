/*import React, { useEffect, useRef, useContext, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { DataContext } from '../Data/DataContextProvider';
import { client } from '../apolloClient'; // Import only client

const Chart1 = () => {
  const canvasRef = useRef(null);
  const { loading, error, data } = useContext(DataContext);
  const [chart, setChart] = useState(null); // State to keep track of the current chart

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bonds = data.query1Data.bonds;
    const bondCounts = {
      '3 Months': 0,
      '6 Months': 0,
      '12 Months': 0,
    };

    bonds.forEach((bond) => {
      const seconds = bond.maturity;
      const months = secondsToMonths(seconds);
      if (months === 3) {
        bondCounts['3 Months']++;
      } else if (months === 6) {
        bondCounts['6 Months']++;
      } else if (months === 12) {
        bondCounts['12 Months']++;
      }
    });

    const labels = Object.keys(bondCounts);
    const dataPoints = Object.values(bondCounts);

    const ctx = canvasRef.current.getContext('2d');

    // Destroy the existing chart before creating a new one
    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of Bonds',
            data: dataPoints,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Bonds',
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
            },
          },
        },
      },
    });

    // Save the current chart to the state
    setChart(newChart);
  }, [loading, error, data]);

  const secondsToMonths = (seconds) => {
    const secondsInAMonth = 2592000; // 30 days assuming each month has 30 days
    return Math.round(seconds / secondsInAMonth);
  };

  return (
    <div>
      <h2>Graph 1</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Chart1;*/







import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { useQuery } from '@apollo/client';
import { QUERY1 } from '../Data/Queries';
import { client } from '../apolloClient';

const Chart1 = () => {
  const canvasRef = useRef(null);
  const [chart, setChart] = useState(null); // State to keep track of the current chart

  const { loading, error, data } = useQuery(QUERY1, {
    client: client, // Pass the Apollo Client instance to the useQuery hook
    pollInterval: 5000, // Optional: Set the polling interval to update the data periodically
  });

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bonds = data.bonds; // Access the data from the query response

    const bondCounts = {
      '3 Months': 0,
      '6 Months': 0,
      '12 Months': 0,
    };

    bonds.forEach((bond) => {
      const seconds = bond.maturity;
      const months = secondsToMonths(seconds);
      if (months === 3) {
        bondCounts['3 Months']++;
      } else if (months === 6) {
        bondCounts['6 Months']++;
      } else if (months === 12) {
        bondCounts['12 Months']++;
      }
    });

    updateChart(bondCounts);
  }, [loading, error, data]);

  const updateChart = (bondCounts) => {
    const labels = Object.keys(bondCounts);
    const dataPoints = Object.values(bondCounts);

    const ctx = canvasRef.current.getContext('2d');

    // Create the chart if it doesn't exist
    if (!chart) {
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Number of Bonds',
              data: dataPoints,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Bonds',
              },
              ticks: {
                font: {
                  size: 12,
                  weight: 'bold',
                },
              },
            },
          },
        },
      });

      // Save the chart to the state
      setChart(newChart);
    } else {
      // Update the existing chart data
      chart.data.labels = labels;
      chart.data.datasets[0].data = dataPoints;
      chart.update();
    }
  };

  const secondsToMonths = (seconds) => {
    const secondsInAMonth = 2592000; // 30 days assuming each month has 30 days
    return Math.round(seconds / secondsInAMonth);
  };

  return (
    <div>
      <h2>Graph 1</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Chart1;






