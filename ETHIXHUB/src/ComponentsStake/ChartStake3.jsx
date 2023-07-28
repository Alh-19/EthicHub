import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import { Chart } from 'chart.js';
import '../Css/Stake.css'

const ChartStake3 = () => {
  const { data } = useContext(DataContext);
  const { query7Data, query8Data } = data;

  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null); // Ref to store the Chart instance

  useEffect(() => {
    if (query7Data && query8Data) {
      const ethData = query7Data.factoryEthixes[0];
      const celoData = query8Data.factoryEthixes[0];

      const chartLabels = [
        'Total Staked',
        'General',
        'Honduras',
        'Brasil',
        'Mexico',
        'Mexico (Cori)',
        'Ecuador',
        'Peru',
      ];

      const ethValues = [
        ethData.totalStaked,
        ethData.totalStakedGeneral,
        ethData.totalStakedHonduras,
        ethData.totalStakedBrasil,
        ethData.totalStakedMexico,
        ethData.totalStakedMexico2,
        ethData.totalStakedEcuador,
        ethData.totalStakedPeru,
      ];

      const celoValues = [
        celoData.totalStaked,
        celoData.totalStakedGeneral,
        celoData.totalStakedHonduras,
        celoData.totalStakedBrasil,
        celoData.totalStakedMexico,
        celoData.totalStakedMexico2,
        celoData.totalStakedEcuador,
        celoData.totalStakedPeru,
      ];

      const chartConfig = {
        type: 'bar', // Change the type of chart as needed
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'ETH',
              data: ethValues,
              backgroundColor: '#062F4F',
              borderColor: '#062F4F',
              borderWidth: 1,
            },
            {
              label: 'CELO',
              data: celoValues,
              backgroundColor: '#87F96E',
              borderColor: '#87F96E',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      setChartData(chartConfig);
    }
  }, [query7Data, query8Data]);

  useEffect(() => {
    if (chartData) {
      // Destroy the previous Chart instance, if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      // Create the chart using chartData and store the instance in the ref
      const ctx = document.getElementById('myChart').getContext('2d');
      chartRef.current = new Chart(ctx, chartData);
    }
  }, [chartData]);

  return (
    <div>
      {query7Data.loading || query8Data.loading ? (
        <p>Loading...</p>
      ) : query7Data.error || query8Data.error ? (
        <p>Error fetching data</p>
      ) : (
        <div  className='chart-ethix-combined'>
        <canvas id="myChart"></canvas>
        </div>
      )}
    </div>
  );
};

export default ChartStake3;




  