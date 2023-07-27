import React, { useEffect, useContext, useRef, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChartStake1C = () => {
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
      // Filter the data for the selected day
      const selectedDay = selectedDate.getDate();
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();

      const ethDataForSelectedDay = query9Data.stakeEthixHolders.filter((item) => {
        const itemDate = new Date(item.dateJoined * 1000);
        return (
          itemDate.getFullYear() === selectedYear &&
          itemDate.getMonth() === selectedMonth &&
          itemDate.getDate() === selectedDay
        );
      });

      const celoDataForSelectedDay = query10Data.stakeEthixHolders.filter((item) => {
        const itemDate = new Date(item.dateJoined * 1000);
        return (
          itemDate.getFullYear() === selectedYear &&
          itemDate.getMonth() === selectedMonth &&
          itemDate.getDate() === selectedDay
        );
      });

      const ethCountForSelectedDay = ethDataForSelectedDay.length;
      const celoCountForSelectedDay = celoDataForSelectedDay.length;
      const allCountForSelectedDay = ethCountForSelectedDay + celoCountForSelectedDay;

      const ethixData = chart.data.datasets.find((dataset) => dataset.label === 'ETH');
      const celoData = chart.data.datasets.find((dataset) => dataset.label === 'CELO');
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');

      ethixData.data = [ethCountForSelectedDay];
      celoData.data = [celoCountForSelectedDay];
      allData.data = [allCountForSelectedDay];

      chart.data.labels = [selectedDate.toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })];
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '10px' }}>
        <div style={{ marginBottom: '40px', marginLeft: '40px' }}>
          {/* Change the DatePicker to allow selecting days */}
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy" // Modify the date format to include days
            showMonthDropdown
            showYearDropdown
            dropdownMode="select" // Allow selecting days in the calendar
            placeholderText="Select a Date"
            todayButton="Today"
          />
        </div>
        <div style={{ height: '400px', width: '100%' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartStake1C;
