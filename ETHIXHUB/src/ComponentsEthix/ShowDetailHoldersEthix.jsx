

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths, isAfter, isBefore } from 'date-fns';


const DetailBondHoldersEthix = () => {
    const { loading, error, data } = useContext(DataContext);
    const dataHoldersEth = data.query11Data?.ethixHolders || [];
    const dataHoldersCelo = data.query12Data?.ethixHolders || [];
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);

    console.log('eth holders data', dataHoldersEth)
    console.log('celo holders data', dataHoldersCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, dataHoldersEth, dataHoldersCelo]);

    //total holders eth and celo
    const totalEthHolders = dataHoldersEth.length;
    const totalCeloHolders = dataHoldersCelo.length;
    // console.log('eth total holders', totalEthHolders, 'celo total holders', totalCeloHolders)
    const activeHolders = showEth ? totalEthHolders : totalCeloHolders;
    // Data Holder eth an celo
    const activeHoldersData = showEth ? dataHoldersEth : dataHoldersCelo;
    
    const getCurrentHolders = () => {
        return showEth ? dataHoldersEth : dataHoldersCelo;
    };






    // Function to calculate the number of ethixholders who were present last month
    const getEthixHoldersLastMonth = () => {
        const currentDate = new Date();
        const firstDayOfLastMonth = startOfMonth(subMonths(currentDate, 1));
        const lastDayOfLastMonth = endOfMonth(subMonths(currentDate, 1));
        const ethixholders = getCurrentHolders();
        return ethixholders.filter(ethixholder => {
            const ethixholderDate = new Date(ethixholder.dateJoined * 1000); // Convert seconds to milliseconds
            return isBefore(ethixholderDate, lastDayOfLastMonth);
        });
    };

    const lastMonthHoldersEth = getEthixHoldersLastMonth(dataHoldersEth).length;
    const lastMonthHoldersCelo = getEthixHoldersLastMonth(dataHoldersCelo).length;
    const lastMonthHoldersStake = showEth ? lastMonthHoldersEth : lastMonthHoldersCelo;
    console.log(lastMonthHoldersEth, lastMonthHoldersCelo)










    //funtion of actual month
    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getUTCFullYear();
        const month = currentDate.getUTCMonth();
        
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = months[month];

        // change format od date
        const formattedDate = `${monthName} ${year}:`;

        return {
            currentDate,
            year,
            month: monthName,
            formattedDate,
            };
    };

    const currentDateDetails = getCurrentDate();
    // console.log('Fecha actual:', currentDateDetails.formattedDate);

    // Function to get the date of the previous month
    const getPreviousMonthDate = () => {
        const currentDate = new Date();
        const previousMonthDate = subMonths(currentDate, 1);
        const year = previousMonthDate.getUTCFullYear();
        const month = previousMonthDate.getUTCMonth();
        
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = months[month];

        // Format the date as desired
        const formattedDate = `${monthName} ${year}:`;

        return {
            year,
            month: monthName,
            formattedDate,
        };
    };

    // Get the date of the previous month
    const previousMonthDateDetails = getPreviousMonthDate();
    // console.log('Fecha mes pasado:', previousMonthDateDetails.formattedDate);

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
                        <h1>{previousMonthDateDetails.formattedDate} </h1>
                        <h1>{currentDateDetails.formattedDate} {activeHolders} holders </h1>
                        <h1>   </h1>

                    </div>

                </div>

            )}


        </div>
    );
};

export default DetailBondHoldersEthix;








