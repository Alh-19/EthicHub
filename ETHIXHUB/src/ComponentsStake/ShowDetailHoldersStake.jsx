

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'; 


const DetailHoldersStake = () => {
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




    



     //funcion para ver el detail
    const toggleDetail = () => {
        setShowDetail(!showDetail);
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
                
                    </div>

                </div>

            )}

        </div>
    );
};

export default DetailHoldersStake;

