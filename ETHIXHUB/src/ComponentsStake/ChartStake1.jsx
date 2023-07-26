import React, { useEffect, useContext, useRef, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChartStake1 = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const { data } = useContext(DataContext);
  const { query9Data, query10Data } = data;
  const [selectedDate, setSelectedDate] = useState(new Date()); // Inicializar con la fecha actual

  useEffect(() => {
    if (chartRef.current && query9Data && query10Data && !chart) {
      const ctx = chartRef.current.getContext('2d');

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
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
          // Opciones del gráfico...
        },
      });

      setChart(newChartInstance);
    }
  }, [chart, query9Data, query10Data]);

  const updateChartData = () => {
    if (chart && chart.data) {
    

      const ethixData = chart.data.datasets.find(
        (dataset) => dataset.label === 'ETH'
      );
      const celoData = chart.data.datasets.find(
        (dataset) => dataset.label === 'CELO'
      );
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');

      const ethCount = stakeEthixHolders ? parseFloat(stakeEthixHolders.count) : 0;
      const celoCount = stakeEthixHolders ? parseFloat(stakeEthixHolders.count) : 0;

      ethixData.data = [ethCount];
      celoData.data = [celoCount];
      allData.data = [ethCount + celoCount];

      chart.data.labels = [selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })];
      chart.update();
    }
  };

  useEffect(() => {
    // Actualizar el gráfico cuando cambie la fecha seleccionada o cuando se monte el componente con la fecha actual
    if (chart && chart.data) {
      updateChartData();
    }
  }, [selectedDate, chart, query9Data, query10Data]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const availableDates = [
    ...query9Data.stakeEthixHolders.map((item) => new Date(item.id)),
    ...query10Data.stakeEthixHolders.map((item) => new Date(item.id)),
  ];
  const uniqueDates = [...new Set(availableDates)];

  return (
    <div>
      <div style={{ height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          placeholderText="Select a Month"
          todayButton="Today"
        />
      </div>
    </div>
  );
};

export default ChartStake1;
