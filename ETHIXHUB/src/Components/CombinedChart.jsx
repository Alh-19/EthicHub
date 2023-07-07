import React, { useContext, useEffect, useRef } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import { Chart } from 'chart.js/auto';

const CombinedChart = () => {
  const { loading, error, data } = useContext(DataContext);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!loading && !error && data) {
      const { bondHolders: bondHolders3 } = data.query3Data;
      const { bondHolders: bondHolders4 } = data.query4Data;

      const bondTotals3 = calculateBondTotals(bondHolders3);
      const bondTotals4 = calculateBondTotals(bondHolders4);

      const allMonths = [...new Set([...Object.keys(bondTotals3), ...Object.keys(bondTotals4)])];
      allMonths.sort((a, b) => {
        const [monthA, yearA] = a.split('/');
        const [monthB, yearB] = b.split('/');
        const dateA = new Date(yearA, monthA - 1);
        const dateB = new Date(yearB, monthB - 1);
        return dateA - dateB;
      }); // Ordenar los meses de forma ascendente

      const getMonthName = (month) => {
        const monthNames = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ];
        return monthNames[month - 1];
      };

      const monthYearLabels = allMonths.map((monthYear) => {
        const [month, year] = monthYear.split('/');
        const monthName = getMonthName(parseInt(month));
        return `${monthName} ${year}`;
      });
      
      const totals3 = fillMissingMonths(bondTotals3, allMonths);
      const totals4 = fillMissingMonths(bondTotals4, allMonths);

      const ctx = chartRef.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthYearLabels,
          datasets: [
            {
              label: 'Total de bonos (Query 3)',
              data: totals3,
              backgroundColor: '#87F96E',
              barPercentage: 1.2, // Ajustar el porcentaje de ancho de la barra
            },
            {
              label: 'Total de bonos (Query 4)',
              data: totals4,
              backgroundColor: '#062F4F',
              barPercentage: 1.2, // Ajustar el porcentaje de ancho de la barra
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

      chartInstanceRef.current = newChartInstance;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [loading, error, data]);

  const calculateBondTotals = (bondHolders) => {
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

    return bondTotals;
  };

  const fillMissingMonths = (bondTotals, allMonths) => {
    const totals = [];

    allMonths.forEach((month) => {
      if (bondTotals.hasOwnProperty(month)) {
        totals.push(bondTotals[month]);
      } else {
        totals.push(0);
      }
    });

    return totals;
  };

  return <canvas ref={chartRef}></canvas>;
};

export default CombinedChart;