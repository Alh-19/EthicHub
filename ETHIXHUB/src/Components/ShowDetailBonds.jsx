import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';

const DetailBonds = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondsEth = data.query1Data.bonds || [];
    const bondsCelo = data.query2Data.bonds || [];
    const [sumaPrincipalTotalEth, setSumaPrincipalTotalEth] = useState(0);
    const [sumaPrincipalTotalCelo, setSumaPrincipalTotalCelo] = useState(0);
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);

    console.log(bondsEth)
    console.log(bondsCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

        // const sumaPrincipalTotalEth = calcularSumaPrincipalTotal(bondsEth);
        // const sumaPrincipalTotalCelo = calcularSumaPrincipalTotal(bondsCelo);
        // setSumaPrincipalTotalEth(sumaPrincipalTotalEth);
        // setSumaPrincipalTotalCelo(sumaPrincipalTotalCelo);

    },[loading, error, bondsEth, bondsCelo]);

    // const calcularSumaPrincipalTotal = (bonds) => {
    //     let sumaPrincipalTotal = 0;
    //     bonds.forEach((bond) => {
    //     bond.bonds.forEach((bond) => {
    //         sumaPrincipalTotal += parseFloat(bond.principal);
    //     });
    // });
    // return sumaPrincipalTotal;
    // };

    // const calcularSumaPrincipalPorBondHolder = (bondHolder) => {
    //     let sumaPrincipalBondHolder = 0;
    //     bondHolder.bonds.forEach((bond) => {
    //         sumaPrincipalBondHolder += parseFloat(bond.principal);
    //     });
    //     return sumaPrincipalBondHolder;
    // };


    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };

    const toggleView = () => {
        setShowEth(!showEth);
    };

    const activeBondHolders = showEth ? bondsEth : bondsCelo;


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

                <h2>Total bonds {activeBondHolders.length}</h2>

                <div className='bhtable'>
                    <p>Token ID:</p>
                    <p>Type:</p>
                    <p>Maturity:</p>
                    <p>¿APR?:</p>
                    <p>Principal {showEth ? '(DAI)' : '(cUSD)'}:</p>
                    <p>Yield {showEth ? '(DAI)' : '(cUSD)'}:</p>
                    <p>Withdrawn {showEth ? '(DAI)' : '(cUSD)'}:</p>
                    <p>Minting date:</p>
                    <p>Maturity date:</p>
                    <p>Redeem date:</p>
                </div>

                {activeBondHolders.map((bonds, index) => (
                <div className='bhtable' key={index}>
                    <p>{bonds.id}</p>
                    <p>{bonds.size}</p>
                    <p>{bonds.maturity}</p>
                    <p>¿APR?:</p>
                    <p>{bonds.principal}</p>
                    <p>Yield:</p>
                    <p>{bonds.withdrawn}:</p>
                    <p>{bonds.maturityDate}</p>
                    <p>{bonds.mintingDate}</p>
                    <p>{bonds.redeemDate}</p>
                    <p></p>
                </div>
                ))}

            </div>
            )}

        </div>
    );
};

export default DetailBonds;

