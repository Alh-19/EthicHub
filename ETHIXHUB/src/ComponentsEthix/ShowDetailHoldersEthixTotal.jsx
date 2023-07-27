

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'; 


const DetailBondHoldersEthixTotal = () => {
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

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getUTCFullYear();
        const month = currentDate.getUTCMonth();
        const day = currentDate.getUTCDate();
        const hours = currentDate.getUTCHours();
        const minutes = currentDate.getUTCMinutes();
        const seconds = currentDate.getUTCSeconds();

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = months[month];
    
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = weekdays[currentDate.getUTCDay()];
    
        // Opcionalmente, puedes dar formato a la fecha y hora como desees, por ejemplo:
        const formattedDate = `${dayOfWeek}, ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds} GMT`;

        return {
            currentDate,
            year,
            month: monthName,
            day,
            hours,
            minutes,
            seconds,
            dayOfWeek,
            formattedDate,
            };
        };

        const currentDateDetails = getCurrentDate();
        console.log('Fecha actual:', currentDateDetails.formattedDate);

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
    // console.log('eth total holders', totalEthHolders, 'celo total holders', totalCeloHolders)

    
    //funcion para ver el detail
    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };

    //funcion para cambiar la vita de Eth a Celo
    const toggleView = () => {
        setShowEth(!showEth);
    };

    const activeHoldersThismonth = showEth ? totalEthHolders : totalCeloHolders;

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
                        <h1>{currentDateDetails.formattedDate}</h1>
                        <h1>Total Holders {showEth ? 'Eth' : 'Celo'} {activeHoldersThismonth} holders </h1>
                        

                    </div>

                    <div className=''>
                            <p>Rank</p>
                            <p>Address</p>
                            <p>Quantity</p>
                            
                        </div>

                </div>

            )}


        </div>
    );

};

export default DetailBondHoldersEthixTotal;

