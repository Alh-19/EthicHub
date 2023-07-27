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
            {showDetail ? 'Close' : 'Show detail'}
            </button>
        </div>
         {showDetail && (
        <div className="detailbh">
         <button className="butonshow2" onClick={toggleDetail}>
            {showDetail ? 'Close' : 'Show detail'}
        </button>
         <div className='btshow'>
            <button className="" onClick={toggleView}>
                {showEth ? 'Show Celo' : 'Show Ethereum'}
            </button>
        </div>
         <h2>Total Bondholders: {activeBondHolders.length}</h2>
        <h2>Principal invested: {sumaPrincipalTotal.toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h2>
         <table style={{width: '100%', backgroundColor: 'gray'}}>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>ID</th>
                    <th>Total Bonds</th>
                    <th>Total Active</th>
                    <th>Total Redeemed</th>
                    <th>Suma Principal</th>
                </tr>
            </thead>
            <tbody>
                {activeBondHolders.map((bondHolder, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{bondHolder.id}</td>
                        <td>{bondHolder.totalBonds}</td>
                        <td>{bondHolder.totalActive}</td>
                        <td>{bondHolder.totalRedeemed}</td>
                        <td>{calcularSumaPrincipalPorBondHolder(bondHolder).toFixed(3)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
         </div>
        )}
     </div>
    );
};

export default ShowDetailBondholder;