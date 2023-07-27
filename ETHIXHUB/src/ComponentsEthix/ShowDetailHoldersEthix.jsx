

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'; 


const DetailBondHoldersEthix = () => {
    const { loading, error, data } = useContext(DataContext);
    const ethixHoldersEth = data.query5Data?.dayCountEthixHolders || [];//CAMBIAR EL QUERYDATA
    const ethixHoldersCelo = data.query6Data?.dayCountEthixHolders || [];//CAMBIAR EL QUERYDATA
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);

    // console.log('eth holders data',ethixHoldersEth)
    // console.log('celo holders data',ethixHoldersCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, ethixHoldersEth, ethixHoldersCelo]);


    // Función para calcular el total histórico de holders
    const calculateTotalHolders = (data) => {
        return data.reduce((total, item) => {
        const count = parseFloat(item.count);
        return (count);
        },);
    };

    // Calcular el total histórico de holders para Ethereum y Celo
    const totalEthHolders = calculateTotalHolders(ethixHoldersEth);
    const totalCeloHolders = calculateTotalHolders(ethixHoldersCelo);
    console.log('eth total holders', totalEthHolders, 'celo total holders', totalCeloHolders)

    // Función para obtener el total histórico de holders del mes pasado
    const calculateTotalHoldersLastMonth = (data) => {
        const currentDate = new Date();
        const lastMonthDate = subMonths(currentDate, 1);

        const lastMonthData = data.filter((item) => {
        const itemDate = new Date(item.date * 1000);
        const startOfMonthDate = startOfMonth(lastMonthDate);
        const endOfMonthDate = endOfMonth(lastMonthDate);
        return itemDate >= startOfMonthDate && itemDate <= endOfMonthDate;
        });

        return calculateTotalHolders(lastMonthData);
    };

    // Calcular el total histórico de holders del mes pasado para Ethereum y Celo
    const totalEthHoldersLastMonth = calculateTotalHoldersLastMonth(ethixHoldersEth);
    const totalCeloHoldersLastMonth = calculateTotalHoldersLastMonth(ethixHoldersCelo);
    // console.log('eth total holders last month',totalEthHoldersLastMonth,'celo total holders last month', totalCeloHoldersLastMonth)

     // Función para calcular el total de nuevos holders que se han unido este mes
    const calculateNewHolders = (data) => {
        const currentDate = new Date();
        const startOfMonthDate = startOfMonth(currentDate);
        const endOfMonthDate = endOfMonth(currentDate);

        const firstDataPoint = data.find((item) => {
        const itemDate = new Date(item.date * 1000);
        return itemDate >= startOfMonthDate;
        });

        const lastDataPoint = data.reduce((latest, item) => {
        const itemDate = new Date(item.date * 1000);
        if (itemDate <= endOfMonthDate) {
            return item;
        }
        return latest;
        }, {});

        if (firstDataPoint && lastDataPoint) {
        const newHoldersCount = parseFloat(lastDataPoint.count) - parseFloat(firstDataPoint.count);
        return newHoldersCount >= 0 ? newHoldersCount : 0;
        }
        return 0;
    };

    // Calcular el total de nuevos holders que se han unido este mes para Ethereum y Celo
    const newEthHoldersThisMonth = calculateNewHolders(ethixHoldersEth);
    const newCeloHoldersThisMonth = calculateNewHolders(ethixHoldersCelo);
    // console.log('eth new holders this month', newEthHoldersThisMonth,'celo new holders this month', newCeloHoldersThisMonth)











    //funcion para ver el detail
    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };

    //funcion para cambiar la vita de Eth a Celo
    const toggleView = () => {
        setShowEth(!showEth);
    };

    const activeHoldersThismonth = showEth ? totalEthHolders : totalCeloHolders;
    const activeHoldersLastmonth = showEth ? totalEthHoldersLastMonth : totalCeloHoldersLastMonth;
    const activeNewHoldersThismonth = showEth ? newEthHoldersThisMonth : newCeloHoldersThisMonth;


    return(
        <div>

            <div className='btshow'>
                <button className="butonshow2" onClick={toggleDetail}>
                {showDetail ? 'Hide detail' : 'Show detail'}
                </button>
            </div>

            {showDetail && (
                <div className="detailbh">

                    <button className="butonshow2" onClick={toggleDetail}>
                        {showDetail ? 'Hide detail' : 'Show detail'}
                    </button>

                    <div className='btshow'>
                        <button className="" onClick={toggleView}>
                            {showEth ? 'Show Celo' : 'Show Ethereum'}
                        </button>
                    </div>

                    <div>
                        <h1> Last Month: {activeHoldersLastmonth} holders </h1>
                        <h1> Current Month: {activeHoldersThismonth} holders </h1>
                        <h1> + {activeNewHoldersThismonth} holders </h1>

                    </div>

                </div>

            )}


        </div>
    );
};

export default DetailBondHoldersEthix;




    // // Función para obtener los datos del mes actual y el mes pasado
    // const getMonthlyData = (data, currentDate) => {
    //     const currentMonthData = data.filter((item) => {
    //     const itemDate = new Date(item.date * 1000);
    //     const startOfMonthDate = startOfMonth(currentDate);
    //     const endOfMonthDate = endOfMonth(currentDate);
    //     return itemDate >= startOfMonthDate && itemDate <= endOfMonthDate;
    //     });

    //     const previousMonthDate = subMonths(currentDate, 1);
    //     const previousMonthData = data.filter((item) => {
    //     const itemDate = new Date(item.date * 1000);
    //     const startOfMonthDate = startOfMonth(previousMonthDate);
    //     const endOfMonthDate = endOfMonth(previousMonthDate);
    //     return itemDate >= startOfMonthDate && itemDate <= endOfMonthDate;
    //     });

    //     return { currentMonthData, previousMonthData };
    // };

    // // Obtener los datos del mes actual y el mes pasado para Ethereum
    // const { currentMonthData: ethCurrentMonthData, previousMonthData: ethPreviousMonthData } = getMonthlyData(
    //     ethixHoldersEth,
    //     new Date()
    // );
    // console.log(ethCurrentMonthData, ethPreviousMonthData)

    // // Obtener los datos del mes actual y el mes pasado para Celo
    // const { currentMonthData: celoCurrentMonthData, previousMonthData: celoPreviousMonthData } = getMonthlyData(
    //     ethixHoldersCelo,
    //     new Date()
    // );
    // console.log(celoCurrentMonthData, celoPreviousMonthData)









    
//      // Función para calcular el total de direcciones que se han unido en el mes actual
//   const calculateTotalAddressesJoined = (data) => {
//     const currentDate = new Date();
//     const startOfMonthDate = startOfMonth(currentDate);
//     const endOfMonthDate = endOfMonth(currentDate);

//     const filteredData = data.filter((item) => {
//       const itemDate = new Date(item.date * 1000);
//       return itemDate >= startOfMonthDate && itemDate <= endOfMonthDate;
//     });

//     const uniqueAddresses = new Set();
//     filteredData.forEach((item) => {
//       uniqueAddresses.add(item.address);
//     });

//     return uniqueAddresses.size;
//   };

//    // Calcular el total de direcciones que se han unido en el mes actual para Ethereum y Celo
//    const totalEthAddressesJoined = calculateTotalAddressesJoined(ethixHoldersEth);
//    const totalCeloAddressesJoined = calculateTotalAddressesJoined(ethixHoldersCelo);
//     console.log(totalEthAddressesJoined, totalCeloAddressesJoined);

//  // Función para calcular el total histórico de direcciones
//  const calculateTotalAddressesJoined = (data) => {
//     const uniqueAddresses = new Set();
//     data.forEach((item) => {
//       uniqueAddresses.add(item.address);
//     });

//     return uniqueAddresses.size;
//   };

//   // Calcular el total histórico de direcciones para Ethereum y Celo
//   const totalEthAddressesJoined = calculateTotalAddressesJoined(ethixHoldersEth);
//   const totalCeloAddressesJoined = calculateTotalAddressesJoined(ethixHoldersCelo);
//   console.log(totalEthAddressesJoined, totalCeloAddressesJoined);
