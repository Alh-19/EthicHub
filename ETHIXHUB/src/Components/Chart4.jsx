import React, { useContext, useEffect, useRef } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import { Chart } from 'chart.js/auto';

const Chart4 = () => {
  const { loading, error, data } = useContext(DataContext);
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null; // Variable para almacenar la instancia del gráfico

    if (!loading && !error && data) {
      const { bondHolders } = data.query4Data;
      const bondTotals = {};

      bondHolders.forEach((bondHolder) => {
        bondHolder.bonds.forEach((bond) => {
          const mintingDate = new Date(bond.mintingDate * 1000); // Convertir segundos a milisegundos
          const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;
          if (bondTotals.hasOwnProperty(monthYear)) {
            bondTotals[monthYear] += 1; // Sumar 1 al total existente
          } else {
            bondTotals[monthYear] = 1; // Inicializar el total en 1 para el mes
          }
        });
      });

      const months = Object.keys(bondTotals);
      const totals = Object.values(bondTotals);

      const ctx = chartRef.current.getContext('2d');

      // Destruir el gráfico anterior si existe
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Crear el nuevo gráfico
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Total de bonos',
              data: totals,
              backgroundColor: '#062F4F',
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Meses',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad de bonos',
              },
            },
          },
        },
      });
    }

    // Devolver una función para destruir el gráfico al desmontar el componente
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [loading, error, data]);

  return (
    <div className="chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Chart4;
