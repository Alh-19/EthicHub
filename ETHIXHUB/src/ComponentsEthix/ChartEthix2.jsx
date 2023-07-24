import React, { useEffect, useContext, useRef, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider.js';
import { Chart } from 'chart.js/auto';

const ChartEthix2 = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const { data } = useContext(DataContext);
  const { query5Data, query6Data } = data;
  const [selectedMonths, setSelectedMonths] = useState([]);

  useEffect(() => {
    if (chartRef.current && query5Data && query6Data && !chart) {
      const ctx = chartRef.current.getContext('2d');

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: selectedMonths,
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
          // ...
        },
      });

      setChart(newChartInstance);
    }
  }, [chart, query5Data, query6Data, selectedMonths]);

  useEffect(() => {
    // Update the chart when the selected months change
    if (chart && chart.data) {
      chart.data.labels = selectedMonths;

      const ethixData = chart.data.datasets.find((dataset) => dataset.label === 'ETH');
      const celoData = chart.data.datasets.find((dataset) => dataset.label === 'CELO');
      const allData = chart.data.datasets.find((dataset) => dataset.label === 'ALL');

      selectedMonths.forEach((selectedMonth) => {
        const ethixHoldersData = query5Data.dayCountEthixHolders.find(
          (item) =>
            new Date(item.date * 1000).toLocaleString('default', { month: 'long', year: 'numeric' }) === selectedMonth
        );
        const celoHoldersData = query6Data.dayCountEthixHolders.find(
          (item) =>
            new Date(item.date * 1000).toLocaleString('default', { month: 'long', year: 'numeric' }) === selectedMonth
        );

        console.log('ethixHoldersData:', ethixHoldersData);
        console.log('celoHoldersData:', celoHoldersData);

        if (ethixHoldersData) {
          const ethCount = parseFloat(ethixHoldersData.count);
          ethixData.data.push(ethCount);
          if (celoHoldersData) {
            allData.data.push(ethCount + parseFloat(celoHoldersData.count));
          } else {
            allData.data.push(ethCount);
          }
        } else {
          ethixData.data.push(0);
          if (celoHoldersData) {
            allData.data.push(parseFloat(celoHoldersData.count));
          } else {
            allData.data.push(0);
          }
        }

        if (celoHoldersData) {
          const celoCount = parseFloat(celoHoldersData.count);
          celoData.data.push(celoCount);
          if (!ethixHoldersData) {
            allData.data.push(celoCount);
          }
        } else {
          celoData.data.push(0);
        }
      });

      chart.update();
    }
  }, [chart, selectedMonths, query5Data, query6Data]);

  const handleDateChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedMonths(selectedOptions);
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
      <select multiple value={selectedMonths} onChange={handleDateChange}>
        <option value="">Select Months</option>
        {uniqueDates.map((date) => (
          <option key={date} value={date}>
            {new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChartEthix2;
