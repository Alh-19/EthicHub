import React, { useEffect, useRef, useContext, useState } from 'react';
import Chart from 'chart.js/auto';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';

const Chart5 = () => {
    const canvasRef = useRef(null);
    const { loading, error, data } = useContext(DataContext);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            if (loading) return;
            if (error) {
                console.error(`Error! ${error.message}`);
                return;
            }

            const calculateTotalBondHoldersEth = () => {
                const bondHoldersEthCount = data.query3Data?.bondHolders?.length ?? 0;
                return bondHoldersEthCount;
            };

            const calculateTotalBondHoldersCelo = () => {
                const bondHoldersCeloCount = data.query4Data?.bondHolders?.length ?? 0;
                return bondHoldersCeloCount;
            };

            const totalBondHoldersEth = calculateTotalBondHoldersEth();
            const totalBondHoldersCelo = calculateTotalBondHoldersCelo();

            // console.log("Total bondHolders from Eth:", totalBondHoldersEth);
            // console.log("Total bondHolders from Celo:", totalBondHoldersCelo);

            const ctx = canvasRef.current.getContext('2d');

            if (chart) {
                chart.destroy();
            }

            const newChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Eth', 'Celo'],
                    datasets: [
                        {
                            label: 'Total Bonds',
                            data: [totalBondHoldersEth, totalBondHoldersCelo],
                            backgroundColor: ['rgba(135, 249, 110, 1)', 'rgb(6, 47, 79)'],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });

            setChart(newChart);
        };

        fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, error, data]);

    return (
    <div className="chart-total-holders">
        <canvas ref={canvasRef}></canvas>
    </div>
    );
};

export default Chart5;

