

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';

const DetailBondholder = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondHoldersEth = data.query3Data?.bondHolders || [];
    const bondHoldersCelo = data.query4Data?.bondHolders || [];
    const [sumaPrincipalTotalEth, setSumaPrincipalTotalEth] = useState(0);
    const [sumaPrincipalTotalCelo, setSumaPrincipalTotalCelo] = useState(0);
    const [showEth, setShowEth] = useState(true);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

        const sumaPrincipalTotalEth = calcularSumaPrincipalTotal(bondHoldersEth);
        const sumaPrincipalTotalCelo = calcularSumaPrincipalTotal(bondHoldersCelo);
        setSumaPrincipalTotalEth(sumaPrincipalTotalEth);
        setSumaPrincipalTotalCelo(sumaPrincipalTotalCelo);
    }, [loading, error, bondHoldersEth, bondHoldersCelo]);

    const calcularSumaPrincipalTotal = (bondHolders) => {
        let sumaPrincipalTotal = 0;
        bondHolders.forEach((bondHolder) => {
        bondHolder.bonds.forEach((bond) => {
            sumaPrincipalTotal += parseFloat(bond.principal);
        });
    });
    return sumaPrincipalTotal;
    };

    const calcularSumaPrincipalPorBondHolder = (bondHolder) => {
        let sumaPrincipalBondHolder = 0;
        bondHolder.bonds.forEach((bond) => {
            sumaPrincipalBondHolder += parseFloat(bond.principal);
        });
        return sumaPrincipalBondHolder;
    };

    const toggleView = () => {
        setShowEth(!showEth);
    };

    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };

    const activeBondHolders = showEth ? bondHoldersEth : bondHoldersCelo;
    const sumaPrincipalTotal = showEth ? sumaPrincipalTotalEth : sumaPrincipalTotalCelo;

    return (
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

        <h2>Total Bondholders: {activeBondHolders.length}</h2>
        <h2>Principal invested: {sumaPrincipalTotal.toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h2>

        <div className='bhtable'>
            <h2>Rank:</h2>
            <p>ID:</p>
            <p>Total Bonds:</p>
            <p>Total Active:</p>
            <p>Total Redeemed:</p>
            <p>Suma Principal:</p>
        </div>

        {activeBondHolders.map((bondHolder, index) => (
            <div className='bhtable' key={index}>
                <h2>{index + 1}</h2>
                <p>{bondHolder.id}</p>
                <p>{bondHolder.totalBonds}</p>
                <p>{bondHolder.totalActive}</p>
                <p>{bondHolder.totalRedeemed}</p>
                <p>{calcularSumaPrincipalPorBondHolder(bondHolder).toFixed(3)}</p>
            </div>
        ))}
        </div>
        )}

    </div>
    );
};

export default DetailBondholder;

