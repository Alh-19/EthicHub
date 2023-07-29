

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
    const [activeCurrency, setActiveCurrency] = useState('CELO');

    const handleCurrencyChange = (currency) => {
        setActiveCurrency(currency);
        setShowEth(currency === 'ETH');
    };

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }

    }, [loading, error, dataHoldersEth, dataHoldersCelo]);


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

    //total holders eth and celo
    const totalEthHolders = dataHoldersEth.length;
    const totalCeloHolders = dataHoldersCelo.length;

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

    const toggleView = () => {
        setShowEth(!showEth);
        setActiveCurrency(!showEth ? 'ETH' : 'CELO');
    };

    return (
        <div>

            <div className='btshow'>
                <button className="butonshow1" onClick={toggleDetail}>
                    {showDetail ? 'Close' : 'Show detail'}
                </button>
            </div>

            {showDetail && (

                <div className="detailbh">
                    <div className="el-switch" style={{ overflowX: 'hidden' }}>
                        <span className={activeCurrency === 'ETH' ? 'active' : ''}
                            onClick={() => handleCurrencyChange('ETH')}>ETH</span>
                        <input type="checkbox" id="switch" />
                        <label for="switch" onClick={toggleView}>
                            {showEth ? 'ETH' : 'CELO'}
                        </label>
                        <span className={activeCurrency === 'CELO' ? 'active' : ''}
                            onClick={() => handleCurrencyChange('CELO')}>CELO</span>

                        <button className="buton-hideshow" onClick={toggleDetail}>
                            {showDetail ? 'Close' : 'Show detail'}
                        </button>
                    </div>

                    <div className='infocards-ethix'>
                        <h3 className='cards-ethix'>{currentDateDetails.formattedDate}</h3>
                        <h3 className='cards-ethix'>Total Holders {showEth ? 'Eth' : 'Celo'} {activeHolders} holders </h3>
                    </div>

                    <thead>
                        <tr>
                            <th className='ethixtb-head'>Rank</th>
                            <th className='ethixtb-head'>Address</th>
                            <th className='ethixtb-head'>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activeHoldersData.map((ethixHolders, index) => {
                            return (
                                <tr key={index}>
                                    <td className='ethix-bodytb'>{index + 1}</td>
                                    <td className='ethix-bodytb'>{ethixHolders.id}</td>
                                    <td className='ethix-bodytb'>{ethixHolders.totalAmount}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </div>
            )}

        </div>
    );
};

export default DetailBondHoldersEthixTotal;

