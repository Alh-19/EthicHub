

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";

const DetailBondHoldersEthix = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondHoldersEth = data.query1Data?.bonds || [];//CAMBIAR EL QUERYDATA
    const bondHoldersCelo = data.query2Data?.bonds || [];//CAMBIAR EL QUERYDATA
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);

    console.log(bondHoldersEth)
    console.log(bondHoldersCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, bondHoldersEth, bondHoldersCelo]);

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

                </div>

            )}


        </div>
    );
};

export default DetailBondHoldersEthix;

