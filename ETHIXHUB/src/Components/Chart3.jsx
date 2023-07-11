
/*import React, { useContext } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  timelineDot: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Timeline1 = () => {
  const classes = useStyles();
  const { loading, error, data } = useContext(DataContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { bondHolders } = data.query3Data;

  // Crear un objeto para almacenar el total de bonos por mes
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

  // Crear un array con los datos de la línea de tiempo
  const timelineData = Object.entries(bondTotals).map(([monthYear, total]) => ({
    monthYear,
    total,
  }));

  return (
    <Timeline>
      {timelineData.map(({ monthYear, total }, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot className={classes.timelineDot} />
          </TimelineSeparator>
          <TimelineContent>{`${monthYear} - Total de bonos: ${total}`}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default Timeline1;*/




import React, { useContext, useEffect, useRef } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import { Chart } from 'chart.js/auto';

const Chart3 = () => {
  const { loading, error, data } = useContext(DataContext);
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null; // Variable para almacenar la instancia del gráfico

    if (!loading && !error && data) {
      const { bondHolders } = data.query3Data;
      const bondTotals = {};

      bondHolders.forEach((bondHolder) => {
        bondHolder.bonds.forEach((bond) => {
          const mintingDate = new Date(bond.mintingDate * 1000); // Convertir segundos a milisegundos
          // console.log(mintingDate)
          const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;
          // console.log(monthYear)
          if (bondTotals.hasOwnProperty(monthYear)) {
            bondTotals[monthYear] += 1; // Sumar 1 al total existente
          } else {
            bondTotals[monthYear] = 1; // Inicializar el total en 1 para el mes
          }
          // console.log(bondTotals)
        });
      });
      // console.log(bondHolders)

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
              backgroundColor: '#87F96E',
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

export default Chart3;




