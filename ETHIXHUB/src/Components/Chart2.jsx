import React, { useEffect, useRef, useContext, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { DataContext } from '../Data/DataContextProvider';
import './Charts.css';

const Chart2 = () => {
  const canvasRef = useRef(null);
  const { loading, error, data } = useContext(DataContext);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bonds = data.query2Data.bonds;
    const bondCounts = {
      '3 Months': { count: 0, principal: 0 },
      '6 Months': { count: 0, principal: 0 },
      '12 Months': { count: 0, principal: 0 },
    };

    bonds.forEach((bond) => {
      const seconds = bond.maturity;
      const months = secondsToMonths(seconds);
      if (months === 3) {
        bondCounts['3 Months'].count++;
        bondCounts['3 Months'].principal += Number(bond.principal);
      } else if (months === 6) {
        bondCounts['6 Months'].count++;
        bondCounts['6 Months'].principal += Number(bond.principal);
      } else if (months === 12) {
        bondCounts['12 Months'].count++;
        bondCounts['12 Months'].principal += Number(bond.principal);
      }
    });

    const labels = Object.keys(bondCounts);
    
    const moneyDataPoints = Object.values(bondCounts).map((item) => item.principal) ;
    


    const ctx = canvasRef.current.getContext('2d');

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.map((label) => `${label} (${bondCounts[label].count})`),
        datasets: [
          {
            label: 'TOTAL PRINCIPAL',
            data: moneyDataPoints ,
            backgroundColor: 'rgb(6, 47, 79)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: '  ',
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'cUSD',
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

    setChart(newChart);
  }, [loading, error, data]);

  const secondsToMonths = (seconds) => {
    const secondsInAMonth = 2592000;
    return Math.round(seconds / secondsInAMonth);
  };

  return (
    <div className="chart">
      <h2>CELO</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Chart2;


