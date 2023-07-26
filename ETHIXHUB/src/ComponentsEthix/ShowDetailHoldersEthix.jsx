

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";

const DetailBondHoldersEthix = () => {
    const { loading, error, data } = useContext(DataContext);
    const ethixHoldersEth = data.query5Data?.dayCountEthixHolders || [];//CAMBIAR EL QUERYDATA
    const ethixHoldersCelo = data.query6Data?.dayCountEthixHolders || [];//CAMBIAR EL QUERYDATA
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);

    console.log('eth',ethixHoldersEth)
    console.log('celo',ethixHoldersCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, ethixHoldersEth, ethixHoldersCelo]);

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

