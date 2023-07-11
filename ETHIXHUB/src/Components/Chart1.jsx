
import React, { useEffect, useRef, useContext, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { DataContext } from '../Data/DataContextProvider';
import Big from 'big.js';
import './Charts.css';

const Chart1 = () => {
  const canvasRef = useRef(null);
  const { loading, error, data } = useContext(DataContext);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bonds = data.query1Data.bonds;
    // console.log(bonds);
    const bondCounts = {
      '3 Months': { count: 0, principal: new Big(0) },
      '6 Months': { count: 0, principal: new Big(0) },
      '12 Months': { count: 0, principal: new Big(0) },
    };

    bonds.forEach((bond) => {
      const seconds = bond.maturity;
      const months = secondsToMonths(seconds);
      if (months === 3) {
        bondCounts['3 Months'].count++;
        bondCounts['3 Months'].principal = bondCounts['3 Months'].principal.plus(new Big(bond.principal));
      } else if (months === 6) {
        bondCounts['6 Months'].count++;
        bondCounts['6 Months'].principal = bondCounts['6 Months'].principal.plus(new Big(bond.principal));
      } else if (months === 12) {
        bondCounts['12 Months'].count++;
        bondCounts['12 Months'].principal = bondCounts['12 Months'].principal.plus(new Big(bond.principal));
      }
    });
    // console.log(bonds)

    const labels = Object.keys(bondCounts);

    const totalPrincipal = Object.values(bondCounts).reduce((total, item) =>
      total.plus(item.principal)
    , new Big(0));

    const ctx = canvasRef.current.getContext('2d');

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.map((label) => `${label} (${bondCounts[label].count} Bonds)`),
       datasets: [
          {
            label: 'TOTAL PRINCIPAL: ' + new Big(totalPrincipal).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' DAI',
            data: Object.values(bondCounts).map((item) => item.principal.toFixed(4)),
            backgroundColor: 'rgba(135, 249, 110, 1)',
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
              text: '',
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
              text: 'DAI',
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.dataset.data[context.dataIndex];
                const formattedValue = new Big(value).toFixed(4);
                const [integerPart, decimalPart] = formattedValue.split('.');
                const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                return formattedIntegerPart + ',' + decimalPart + ' DAI';
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
      <h2>ETH</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Chart1;

