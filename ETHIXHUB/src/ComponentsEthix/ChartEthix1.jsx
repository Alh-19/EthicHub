import React, { useEffect, useContext, useRef, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';

const ChartEthix1 = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const { data } = useContext(DataContext);
  const { query5Data, query6Data } = data;
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (chartRef.current && query5Data && query6Data && !chart) {
      const ctx = chartRef.current.getContext('2d');

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [selectedDate],
          datasets: [
            {
              label: 'ETH',
              data: [],
              backgroundColor: '#062F4F',
              borderColor: '#062F4F',
              borderWidth: 1,
            },
            {
              label: 'CELO',
              data: [],
              backgroundColor: '#87F96E',
              borderColor: '#87F96E',
              borderWidth: 1,
            },
            {
              label: 'ALL',
              data: [],
              backgroundColor: '#74D7DC',
              borderColor: '#74D7DC',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          indexAxis: 'x', // Cambiar a 'x' para barras verticales
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month', // Etiqueta del eje x
              },
              display: true, // Mostrar el eje x
              ticks: {
                autoSkip: false, // Evitar que se salten las etiquetas
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of IDs',
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const datasetLabel = context.dataset.label || '';
                  const value = context.parsed.y || 0;
                  return `${datasetLabel}: ${value}`;
                },
              },
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              formatter: (value, context) => {
                const datasetLabel = context.dataset.label || '';
                return `${datasetLabel} - ${selectedDate}`;
              },
            },
          },
        },
      });

      setChart(newChartInstance);
    }
  }, [chart, query5Data, query6Data, selectedDate]);

  useEffect(() => {
    // Update the chart when the selected date changes
    if (chart && chart.data) {
      const ethixHoldersData = query5Data.dayCountEthixHolders.find(
        (item) =>
          new Date(item.date * 1000).toLocaleString('default', { month: 'long', year: 'numeric' }) === selectedDate
      );
      const celoHoldersData = query6Data.dayCountEthixHolders.find(
        (item) =>
          new Date(item.date * 1000).toLocaleString('default', { month: 'long', year: 'numeric' }) === selectedDate
      );

      console.log('ethixHoldersData:', ethixHoldersData);
      console.log('celoHoldersData:', celoHoldersData);

      const ethixData = chart.data.datasets.find((dataset) => dataset.label === 'ETH');
      const celoData = chart.data.datasets.find((dataset) => dataset.label === 'CELO');
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');

      if (ethixHoldersData) {
        const ethCount = parseFloat(ethixHoldersData.count);
        ethixData.data = [ethCount];
        if (celoHoldersData) {
          allData.data = [ethCount + parseFloat(celoHoldersData.count)];
        } else {
          allData.data = [ethCount];
        }
      } else {
        ethixData.data = [];
        if (celoHoldersData) {
          allData.data = [parseFloat(celoHoldersData.count)];
        } else {
          allData.data = [];
        }
      }

      if (celoHoldersData) {
        const celoCount = parseFloat(celoHoldersData.count);
        celoData.data = [celoCount];
        if (!ethixHoldersData) {
          allData.data = [celoCount];
        }
      } else {
        celoData.data = [];
      }

      chart.update();
    }
  }, [chart, selectedDate, query5Data, query6Data]);


  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const availableDates = [
    ...query5Data.dayCountEthixHolders.map((item) =>
      new Date(item.date * 1000).toLocaleString('default', { month: 'long', year: 'numeric' })
    ),
    ...query6Data.dayCountEthixHolders.map((item) =>
      new Date(item.date * 1000).toLocaleString('default', { month: 'long', year: 'numeric' })
    ),
  ];
  const uniqueDates = [...new Set(availableDates)];

  return (
    <div>
      <canvas ref={chartRef}></canvas>
      <select value={selectedDate} onChange={handleDateChange}>
        <option value="">Select a Month</option>
        {uniqueDates.map((date) => (
          <option key={date} value={date}>
            {new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChartEthix1; 



