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

  // Inicializar con el mes pasado
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
  const [selectedDate, setSelectedDate] = useState(lastMonth);

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
      updateChartData();
    }
  }, [chart, query9Data, query10Data]);

  useEffect(() => {
    // Actualizar el gráfico cuando cambie la fecha seleccionada
    if (chart && chart.data) {
      updateChartData();
    }
  }, [selectedDate, chart]); // Asegúrate de agregar "chart" como dependencia también

  const updateChartData = () => {
    if (selectedDate && chart && chart.data) {
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();

      // Filtrar los datos de holders hasta la fecha más actual
      const ethDataUntilDate = query9Data.stakeEthixHolders.filter((item) => {
        const itemDate = new Date(item.dateJoined * 1000);
        return (
          itemDate.getFullYear() < selectedYear ||
          (itemDate.getFullYear() === selectedYear && itemDate.getMonth() <= selectedMonth)
        );
      });

      const celoDataUntilDate = query10Data.stakeEthixHolders.filter((item) => {
        const itemDate = new Date(item.dateJoined * 1000);
        return (
          itemDate.getFullYear() < selectedYear ||
          (itemDate.getFullYear() === selectedYear && itemDate.getMonth() <= selectedMonth)
        );
      });

      // Calcular la cantidad acumulada de holders hasta la fecha más actual
      const ethCountAccumulated = ethDataUntilDate.length;
      const celoCountAccumulated = celoDataUntilDate.length;
      const allCountAccumulated = ethCountAccumulated + celoCountAccumulated;

      const ethixData = chart.data.datasets.find((dataset) => dataset.label === 'ETH');
      const celoData = chart.data.datasets.find((dataset) => dataset.label === 'CELO');
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');

      ethixData.data = [ethCountAccumulated];
      celoData.data = [celoCountAccumulated];
      allData.data = [allCountAccumulated];

      chart.data.labels = [selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })];
      chart.update();
    }
  };

  useEffect(() => {
    if (chart && chart.data) {
      updateChartData();
    }
  }, [selectedDate, chart, query9Data, query10Data]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div>
        <div className='datepicker-container'>
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
        <div className='chart-ethix'>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartStake1;
