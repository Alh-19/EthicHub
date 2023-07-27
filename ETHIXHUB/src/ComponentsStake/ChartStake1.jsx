/*import React, { useEffect, useContext, useRef, useState } from 'react';
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
        type: 'bar', // Cambiar a 'bar' para un gráfico de barras
        data: {
          labels: [],
          datasets: [
            {
              label: 'ETH',
              data: [],
              backgroundColor: '#062F4F',
              borderWidth: 1,
            },
            {
              label: 'CELO',
              data: [],
              backgroundColor: '#87F96E',
              borderWidth: 1,
            },
            {
              label: 'Total',
              data: [],
              backgroundColor: '#74D7DC',
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

      // Filtrar los holders para ETH que tienen "dateLeft": null
      const ethHolders = query9Data.stakeEthixHolders.filter((item) => {
        return item.dateLeft === null && item.dateJoined ? new Date(item.dateJoined * 1000).getMonth() <= selectedMonth && new Date(item.dateJoined * 1000).getFullYear() === selectedYear : false;
      });

      // Filtrar los holders para CELO que tienen "dateLeft": null
      const celoHolders = query10Data.stakeEthixHolders.filter((item) => {
        return item.dateLeft === null && item.dateJoined ? new Date(item.dateJoined * 1000).getMonth() <= selectedMonth && new Date(item.dateJoined * 1000).getFullYear() === selectedYear : false;
      });

      // Calcular la cantidad acumulada de holders para ETH
      const totalEthHolders = calculateAccumulatedHolders(ethHolders, selectedMonth, selectedYear);

      // Calcular la cantidad acumulada de holders para CELO
      const totalCeloHolders = calculateAccumulatedHolders(celoHolders, selectedMonth, selectedYear);

      const ethixData = chart.data.datasets.find((dataset) => dataset.label === 'ETH');
      const celoData = chart.data.datasets.find((dataset) => dataset.label === 'CELO');
      const totalData = chart.data.datasets.find((dataset) => dataset.label === 'Total');

      ethixData.data = totalEthHolders;
      celoData.data = totalCeloHolders;
      totalData.data = totalEthHolders.map((ethCount, index) => ethCount + totalCeloHolders[index]);

      chart.data.labels = getTotalLabels(selectedYear, selectedMonth);
      chart.update();
    }
  };

  const calculateAccumulatedHolders = (holders, selectedMonth, selectedYear) => {
    const accumulatedHolders = new Array(selectedMonth + 1).fill(0);

    holders.forEach((item) => {
      const itemDate = item.dateLeft === null ? new Date(item.dateJoined * 1000) : null;
      if (itemDate && itemDate.getFullYear() === selectedYear && itemDate.getMonth() <= selectedMonth) {
        accumulatedHolders[itemDate.getMonth()]++;
      }
    });

    for (let i = 1; i < accumulatedHolders.length; i++) {
      accumulatedHolders[i] += accumulatedHolders[i - 1];
    }

    return accumulatedHolders;
  };

  const getTotalLabels = (selectedYear, selectedMonth) => {
    const labels = [];
    for (let i = 0; i <= selectedMonth; i++) {
      const date = new Date(selectedYear, i);
      labels.push(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    }
    return labels;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const availableDates = [
    ...query9Data.stakeEthixHolders.map((item) => new Date(item.dateJoined * 1000)),
    ...query10Data.stakeEthixHolders.map((item) => new Date(item.dateJoined * 1000)),
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
import React, { useEffect, useContext, useRef, useState, useCallback } from 'react';
import { DataContext } from '../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChartStake1 = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const { data } = useContext(DataContext);
  const { query9Data, query10Data } = data;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const updateChartData = useCallback(() => {
    if (selectedDate && chart && chart.data) {
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();

      const ethHolders = query9Data.stakeEthixHolders.filter((item) => {
        return (
          item.dateLeft === null &&
          item.dateJoined &&
          new Date(item.dateJoined * 1000).getFullYear() <= selectedYear &&
          new Date(item.dateJoined * 1000).getMonth() <= selectedMonth
        );
      });

      const celoHolders = query10Data.stakeEthixHolders.filter((item) => {
        return (
          item.dateLeft === null &&
          item.dateJoined &&
          new Date(item.dateJoined * 1000).getFullYear() <= selectedYear &&
          new Date(item.dateJoined * 1000).getMonth() <= selectedMonth
        );
      });

      const totalEthHolders = calculateAccumulatedHolders(ethHolders, selectedYear, selectedMonth);
      const totalCeloHolders = calculateAccumulatedHolders(celoHolders, selectedYear, selectedMonth);

      const totalIdsPerMonth = calculateTotalIds(totalEthHolders, totalCeloHolders);

      const ethixData = chart.data.datasets.find((dataset) => dataset.label === 'ETH');
      const celoData = chart.data.datasets.find((dataset) => dataset.label === 'CELO');
      const totalData = chart.data.datasets.find((dataset) => dataset.label === 'Total');

      ethixData.data = [totalEthHolders[selectedMonth]];
      celoData.data = [totalCeloHolders[selectedMonth]];
      totalData.data = [totalIdsPerMonth[selectedMonth]];

      chart.data.labels = [getTotalLabels(selectedYear, selectedMonth)[selectedMonth]];
      chart.update();
    }
  }, [chart, query9Data, query10Data, selectedDate]);

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
              borderWidth: 1,
            },
            {
              label: 'CELO',
              data: [],
              backgroundColor: '#87F96E',
              borderWidth: 1,
            },
            {
              label: 'Total',
              data: [],
              backgroundColor: '#74D7DC',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Historical Cumulative Sum of IDs',
            },
          },
        },
      });

      setChart(newChartInstance);
    }
  }, [chart, query9Data, query10Data]);

  useEffect(() => {
    if (chart && chart.data) {
      updateChartData();
    }
  }, [selectedDate, chart, updateChartData]);

  const calculateAccumulatedHolders = (holders, selectedYear, selectedMonth) => {
    const accumulatedHolders = new Array(selectedMonth + 1).fill(0);

    holders.forEach((item) => {
      const itemYear = new Date(item.dateJoined * 1000).getFullYear();
      const itemMonth = new Date(item.dateJoined * 1000).getMonth();
      if (itemYear < selectedYear || (itemYear === selectedYear && itemMonth <= selectedMonth)) {
        accumulatedHolders[itemMonth]++;
      }
    });

    for (let i = 1; i < accumulatedHolders.length; i++) {
      accumulatedHolders[i] += accumulatedHolders[i - 1];
    }

    return accumulatedHolders;
  };

  const calculateTotalIds = (ethHolders, celoHolders) => {
    return ethHolders.map((ethCount, index) => ethCount + celoHolders[index]);
  };

  const getTotalLabels = (selectedYear, selectedMonth) => {
    const labels = [];
    const date = new Date(selectedYear, selectedMonth);
    labels.push(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    return labels;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
        type: 'bar', // Cambiar a 'bar' para un gráfico de barras
        data: {
          labels: [],
          datasets: [
            {
              label: 'ETH',
              data: [],
              backgroundColor: '#062F4F',
              borderWidth: 1,
            },
            {
              label: 'CELO',
              data: [],
              backgroundColor: '#87F96E',
              borderWidth: 1,
            },
            {
              label: 'Total',
              data: [],
              backgroundColor: '#74D7DC',
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

      // Filtrar los holders para ETH que tienen "dateLeft": null hasta la fecha seleccionada
      const ethHolders = query9Data.stakeEthixHolders.filter((item) => {
        return item.dateLeft === null && item.dateJoined ? new Date(item.dateJoined * 1000) <= selectedDate : false;
      });

      // Filtrar los holders para CELO que tienen "dateLeft": null hasta la fecha seleccionada
      const celoHolders = query10Data.stakeEthixHolders.filter((item) => {
        return item.dateLeft === null && item.dateJoined ? new Date(item.dateJoined * 1000) <= selectedDate : false;
      });

      // Calcular la cantidad acumulada de holders para ETH
      const totalEthHolders = calculateAccumulatedHolders(ethHolders, selectedMonth, selectedYear);

      // Calcular la cantidad acumulada de holders para CELO
      const totalCeloHolders = calculateAccumulatedHolders(celoHolders, selectedMonth, selectedYear);

      const ethixData = chart.data.datasets.find((dataset) => dataset.label === 'ETH');
      const celoData = chart.data.datasets.find((dataset) => dataset.label === 'CELO');
      const totalData = chart.data.datasets.find((dataset) => dataset.label === 'Total');

      ethixData.data = totalEthHolders;
      celoData.data = totalCeloHolders;
      totalData.data = totalEthHolders.map((ethCount, index) => ethCount + totalCeloHolders[index]);

      chart.data.labels = getTotalLabels(selectedYear, selectedMonth);
      chart.update();
    }
  };

  const calculateAccumulatedHolders = (holders, selectedMonth, selectedYear) => {
    const accumulatedHolders = new Array(selectedMonth + 1).fill(0);

    holders.forEach((item) => {
      const itemDate = item.dateLeft === null ? new Date(item.dateJoined * 1000) : null;
      if (itemDate && itemDate.getFullYear() === selectedYear && itemDate.getMonth() <= selectedMonth) {
        accumulatedHolders[itemDate.getMonth()]++;
      }
    });

    for (let i = 1; i < accumulatedHolders.length; i++) {
      accumulatedHolders[i] += accumulatedHolders[i - 1];
    }

    return accumulatedHolders;
  };

  const getTotalLabels = (selectedYear, selectedMonth) => {
    const labels = [];
    for (let i = 0; i <= selectedMonth; i++) {
      const date = new Date(selectedYear, i);
      labels.push(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    }
    return labels;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const availableDates = [
    ...query9Data.stakeEthixHolders.map((item) => new Date(item.dateJoined * 1000)),
    ...query10Data.stakeEthixHolders.map((item) => new Date(item.dateJoined * 1000)),
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

export default ChartStake1;*/

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '10px' }}>
        <div style={{ marginBottom: '40px', marginLeft: '40px' }}>
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

export default ChartStake1;
