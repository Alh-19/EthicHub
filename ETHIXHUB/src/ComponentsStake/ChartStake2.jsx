import React, { useEffect, useRef, useContext } from 'react';
import Chart from 'chart.js/auto';
import { DataContext } from '../Data/DataContextProvider';

const ChartStake2 = () => {
  const canvasRef = useRef(null);
  const { loading, error, data } = useContext(DataContext);

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const calculateTotalStakeHoldersEth = () => {
      const stakeHoldersEthCount = data.query9Data?.stakeEthixHolders?.length ?? 0;
      return stakeHoldersEthCount;
    };

    const calculateTotalStakeHoldersCelo = () => {
      const stakeHoldersCeloCount = data.query10Data?.stakeEthixHolders?.length ?? 0;
      return stakeHoldersCeloCount;
    };

    const totalStakeHoldersEth = calculateTotalStakeHoldersEth();
    const totalStakeHoldersCelo = calculateTotalStakeHoldersCelo();

    console.log("Total stakeHolders from Eth:", totalStakeHoldersEth);
    console.log("Total stakeHolders from Celo:", totalStakeHoldersCelo);

    const ctx = canvasRef.current.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Eth', 'Celo'],
          datasets: [
            {
              label: 'Total Bonds',
              data: [totalStakeHoldersEth, totalStakeHoldersCelo],
              backgroundColor: ['#062F4F', '#87F96E'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [loading, error, data]);

  return <canvas ref={canvasRef} />;
};

export default ChartStake2;
