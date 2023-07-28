

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths, isAfter, isBefore } from 'date-fns';


const DetailHoldersStake = () => {
    const { loading, error, data } = useContext(DataContext);
    const stakeHoldersEth = data.query9Data?.stakeEthixHolders || [];
    const stakeHoldersCelo = data.query10Data?.stakeEthixHolders || [];
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);

    // console.log('eth holders data',stakeHoldersEth)
    // console.log('celo holders data',stakeHoldersCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, stakeHoldersEth, stakeHoldersCelo, showEth]);

    const getCurrentHolders = () => {
        return showEth ? stakeHoldersEth : stakeHoldersCelo;
    };

    const currentHoldersStake = getCurrentHolders();

     // Function to calculate the number of stakeholders who joined this month
    const getStakeholdersJoinedThisMonth = () => {
        const currentDate = new Date();
        const firstDayOfThisMonth = startOfMonth(currentDate);
        const lastDayOfThisMonth = endOfMonth(currentDate);
        const stakeholders = getCurrentHolders();
        return stakeholders.filter(stakeholder => {
            const stakeholderDate = new Date(stakeholder.dateJoined * 1000); // Convert seconds to milliseconds
            return isAfter(stakeholderDate, firstDayOfThisMonth) && isBefore(stakeholderDate, lastDayOfThisMonth);
        });
    };

    const getThisMonthHoldersEth = getStakeholdersJoinedThisMonth(stakeHoldersEth).length
    const getThisMonthHoldersCelo = getStakeholdersJoinedThisMonth(stakeHoldersCelo).length
    // console.log(getThisMonthHoldersEth, getThisMonthHoldersCelo);
    const newHoldersStake = showEth ? getThisMonthHoldersEth : getThisMonthHoldersCelo;
    
    const newStakeHoldersDataEth = getStakeholdersJoinedThisMonth(stakeHoldersEth)
    const newStakeHoldersDataCelo = getStakeholdersJoinedThisMonth(stakeHoldersCelo)
    const newHoldersStakeData = showEth ? newStakeHoldersDataEth : newStakeHoldersDataCelo;

    // Function to calculate the total of stakeEthixHolders.totalAmount in newHoldersStakeData
    const calculateTotalAmount = () => {
        const totalAmount = newHoldersStakeData.reduce((accumulator, stakeholder) => {
            const amount = parseFloat(stakeholder.totalAmount);
            return accumulator + amount;
        }, 0);

        return totalAmount;
    };

    const totalAmountStakeEthixHoldersEth = calculateTotalAmount(newStakeHoldersDataEth);
    const totalAmountStakeEthixHoldersCelo = calculateTotalAmount(newStakeHoldersDataCelo);
    const totalAmountStake = showEth ? totalAmountStakeEthixHoldersEth : totalAmountStakeEthixHoldersCelo;

    // Function to calculate the number of stakeholders who were present last month
    const getStakeholdersLastMonth = () => {
        const currentDate = new Date();
        const firstDayOfLastMonth = startOfMonth(subMonths(currentDate, 1));
        const lastDayOfLastMonth = endOfMonth(subMonths(currentDate, 1));
        const stakeholders = getCurrentHolders();
        return stakeholders.filter(stakeholder => {
            const stakeholderDate = new Date(stakeholder.dateJoined * 1000); // Convert seconds to milliseconds
            return isBefore(stakeholderDate, lastDayOfLastMonth);
        });
    };

    const lastMonthHoldersEth = getStakeholdersLastMonth(stakeHoldersEth).length;
    const lastMonthHoldersCelo = getStakeholdersLastMonth(stakeHoldersCelo).length;
    const lastMonthHoldersStake = showEth ? lastMonthHoldersEth : lastMonthHoldersCelo;

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

    //funtion to change detail Eth or Celo
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
                        <h1>{previousMonthDateDetails.formattedDate} {lastMonthHoldersStake} holders</h1>
                        <h1>{currentDateDetails.formattedDate} {currentHoldersStake.length} holders</h1>
                        <h1>+{newHoldersStake} holders </h1>
                    </div>


                    <div>
                        <h2> Total addresses joined - {newHoldersStake} </h2>

                        <h3> {totalAmountStake} stk ethix</h3>

                        {newHoldersStakeData.map((stakeEthixHolders, index) =>{
                            
                            return(
                                

                                <tbody className='' key={index}>
                                    <td className=''>{stakeEthixHolders.id}</td>
                                    <td className=''>{stakeEthixHolders.totalAmount} stk ethix</td>
                                </tbody>

                                

                            )
                        })}

                    </div>


                </div>
            )}

        </div>
    );
};

export default DetailHoldersStake;






    



