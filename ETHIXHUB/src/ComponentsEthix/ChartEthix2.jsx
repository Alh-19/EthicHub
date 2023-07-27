/*import React, { useEffect, useContext, useRef, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChartEthix2 = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const { data } = useContext(DataContext);
  const { query5Data, query6Data } = data;
  const [selectedDate, setSelectedDate] = useState(new Date()); // Inicializar con la fecha actual

  useEffect(() => {
    if (chartRef.current && query5Data && query6Data && !chart) {
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
  }, [chart, query5Data, query6Data]);

  const updateChartData = () => {
    if (chart && chart.data) {
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();

      const lastEthixHoldersData = query5Data.dayCountEthixHolders
        .filter((item) => {
          const itemDate = new Date(item.date * 1000);
          return (
            itemDate.getMonth() === selectedMonth &&
            itemDate.getFullYear() === selectedYear
          );
        })
        .pop();

      const lastCeloHoldersData = query6Data.dayCountEthixHolders
        .filter((item) => {
          const itemDate = new Date(item.date * 1000);
          return (
            itemDate.getMonth() === selectedMonth &&
            itemDate.getFullYear() === selectedYear
          );
        })
        .pop();

      const ethixData = chart.data.datasets.find(
        (dataset) => dataset.label === 'ETH'
      );
      const celoData = chart.data.datasets.find(
        (dataset) => dataset.label === 'CELO'
      );
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');

      const ethCount = lastEthixHoldersData ? parseFloat(lastEthixHoldersData.count) : 0;
      const celoCount = lastCeloHoldersData ? parseFloat(lastCeloHoldersData.count) : 0;

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
  }, [selectedDate, chart, query5Data, query6Data]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const availableDates = [
    ...query5Data.dayCountEthixHolders.map((item) => new Date(item.date * 1000)),
    ...query6Data.dayCountEthixHolders.map((item) => new Date(item.date * 1000)),
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

export default ChartEthix2;*/














import React, { useEffect, useContext, useRef, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChartEthix2 = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const { data } = useContext(DataContext);
  const { query5Data, query6Data } = data;
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (chartRef.current && query5Data && query6Data && !chart) {
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
  }, [chart, query5Data, query6Data]);

  const updateChartData = () => {
    if (selectedDate && chart && chart.data) {
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();

      const lastEthixHoldersData = query5Data.dayCountEthixHolders
        .find((item) => {
          const itemDate = new Date(item.date * 1000);
          return (
            itemDate.getMonth() === selectedMonth &&
            itemDate.getFullYear() === selectedYear
          );
        });

      const lastCeloHoldersData = query6Data.dayCountEthixHolders
        .find((item) => {
          const itemDate = new Date(item.date * 1000);
          return (
            itemDate.getMonth() === selectedMonth &&
            itemDate.getFullYear() === selectedYear
          );
        });

      const ethixData = chart.data.datasets.find(
        (dataset) => dataset.label === 'ETH'
      );
      const celoData = chart.data.datasets.find(
        (dataset) => dataset.label === 'CELO'
      );
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');

      const ethCount = lastEthixHoldersData ? parseFloat(lastEthixHoldersData.count) : 0;
      const celoCount = lastCeloHoldersData ? parseFloat(lastCeloHoldersData.count) : 0;

      ethixData.data = [ethCount];
      celoData.data = [celoCount];
      allData.data = [ethCount + celoCount];

      chart.data.labels = [selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })];
      chart.update();
    }
  };

  useEffect(() => {
    if (chart && chart.data) {
      updateChartData();
    }
  }, [selectedDate, chart, query5Data, query6Data]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <div style={{ height: '400px', width: '100%' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartEthix2;
