import React, { useEffect, useRef, useContext } from 'react';
import { Chart } from 'chart.js/auto';
import { DataContext } from '../Data/DataContextProvider';

const Chart1 = () => {
  const canvasRef = useRef(null);
  const { loading, error, data } = useContext(DataContext);
  
  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bonds = data.query1Data.bonds;
    const maturityMonths = bonds.map((bond) => bond.maturity);
    const bondCounts = {
      '3 Months': 7776000,
      '6 Months': 15552000,
      '12 Months': 31536000,
    };

    maturityMonths.forEach((months) => {
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
    new Chart(ctx, {
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
  },
   [loading, error, data]);

  return (
    <div>
      <h2>Graph 1</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};
export default Chart1;