

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'; 

const DetailBondHoldersEthixTotal = () => {
    const { loading, error, data } = useContext(DataContext);
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);
    const dataHoldersEth = data.query11Data?.ethixHolders || [];
    const dataHoldersCelo = data.query12Data?.ethixHolders || [];

    // console.log('eth holders data', dataHoldersEth)
    // console.log('celo holders data', dataHoldersCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, dataHoldersEth, dataHoldersCelo]);


    //Get current date
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
    
        // Give format to the date
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
    // console.log('Fecha actual:', currentDateDetails.formattedDate);

    //total holders eth and celo
    const totalEthHolders = dataHoldersEth.length;
    const totalCeloHolders = dataHoldersCelo.length;
    // console.log('eth total holders', totalEthHolders, 'celo total holders', totalCeloHolders)
    const activeHolders = showEth ? totalEthHolders : totalCeloHolders;
    const activeHoldersData = showEth ? dataHoldersEth : dataHoldersCelo;

    
    //funtion scroll top
    const moveToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
    //funtion to show detail
    const toggleDetail = () => {
        setShowDetail(!showDetail);
        moveToTop();
    };

    //funtion to change between Eth and Celo
    const toggleView = () => {
        setShowEth(!showEth);
    };

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
                        <h1>Total Holders {showEth ? 'Eth' : 'Celo'} {activeHolders} holders </h1>
                    </div>

                    <div className=''>
                    <thead className=''>
                        <th className=''>Rank</th>
                        <th className=''>Address</th>
                        <th className=''>Quantity</th>
                    </thead>
                    </div>

                    <div>
                        {activeHoldersData.map((ethixHolders, index) =>{
                            return(
                                <tbody className='' key={index}>
                                    <td className=''>{index + 1}</td>
                                    <td className=''>{ethixHolders.id}</td>
                                    <td className=''>{ethixHolders.totalAmount}</td>
                                </tbody>
                            )
                        })}
                    </div>

                </div>
            )}

        </div>
    );
};

export default DetailBondHoldersEthixTotal;

