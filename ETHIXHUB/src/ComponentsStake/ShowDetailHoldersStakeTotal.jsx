
import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'; 


const DetailHoldersStakeTotal = () => {
    const { loading, error, data } = useContext(DataContext);
    const stakeHoldersEth = data.query9Data?.stakeEthixHolders || [];
    const stakeHoldersCelo = data.query10Data?.stakeEthixHolders || [];
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);

    console.log('eth holders data',stakeHoldersEth)
    console.log('celo holders data',stakeHoldersCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, stakeHoldersEth, stakeHoldersCelo]);

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
    // console.log('Fecha actual:', currentDateDetails.formattedDate);



    

    const activeHoldersThismonth = showEth ? stakeHoldersEth : stakeHoldersCelo;
    console.log('aqui',activeHoldersThismonth)

    //funcion scroll arriba
    const moveToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
    //funcion para ver el detail
    const toggleDetail = () => {
        setShowDetail(!showDetail);
        moveToTop();
    };

    //funcion para cambiar la vita de Eth a Celo
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
                        <h1>Total Holders {showEth ? 'Eth' : 'Celo'} {activeHoldersThismonth.length} holders </h1>
                    </div>

                    <div>
                        <thead className=''>
                            <th className=''>Rank</th>
                            <th className=''>Address</th>
                            <th className=''>Quantity</th>
                            <th className=''>Stake Type</th>
                        </thead>
                    </div>

                    <div>
                    {activeHoldersThismonth.map((stakeEthixHolders, index) => {
                            return(
                                <tbody className=''key={index}>
                                    <td className=''>{index + 1}</td>
                                    <td className=''>{stakeEthixHolders.id}</td>
                                    <td className=''>{stakeEthixHolders.totalAmount}</td>
                                    <td className=''>{stakeEthixHolders.type}</td>
                                </tbody>
                            )
                        })}
                    </div>

                </div>

            )}

        </div>
    );
};

export default DetailHoldersStakeTotal;