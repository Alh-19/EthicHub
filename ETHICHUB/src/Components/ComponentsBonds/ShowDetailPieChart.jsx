import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../Data/DataContextProvider';
import '../../Css/Bonds.css';

const DetailBondholder = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondHoldersEth = data.query3Data?.bondHolders || [];
    const bondHoldersCelo = data.query4Data?.bondHolders || [];
    const [sumaPrincipalTotalEth, setSumaPrincipalTotalEth] = useState(0);
    const [sumaPrincipalTotalCelo, setSumaPrincipalTotalCelo] = useState(0);
    const [showEth, setShowEth] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
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
        setActiveCurrency(!showEth ? 'ETH' : 'CELO');
    };
    const moveToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const toggleDetail = () => {
        setShowDetail(!showDetail);
        moveToTop();
    };
    const activeBondHolders = showEth ? bondHoldersEth : bondHoldersCelo;
    const sumaPrincipalTotal = showEth ? sumaPrincipalTotalEth : sumaPrincipalTotalCelo;
    return (
        <>
            <div>
                <div className='btshow'>
                    <button className="butonshow1" onClick={toggleDetail}>
                        {showDetail ? 'Close' : 'Show detail'}
                    </button>
                </div>
                 {showDetail && (
                    <div className="detailbh">                                    
                        <div className="el-switch" style={{overflowX:'hidden'}}>
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
                                                 
                        <div className='container-tarjetas'>
                         <div className='total-bondholders'><h3>Total Bondholders: {activeBondHolders.length}</h3></div>
                         <div className='principal-invested'><h3>Principal invested: {sumaPrincipalTotal.toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h3></div>
                         </div> 
                        
                            <thead>
                                <tr>
                                    <th className='total-bh'>Rank</th>
                                    <th className='total-bh'>ID</th>
                                    <th className='total-bh'>Total Bonds</th>
                                    <th className='total-bh'>Total Active</th>
                                    <th className='total-bh'>Total Redeemed</th>
                                    <th className='total-bh'>Suma Principal</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {activeBondHolders.map((bondHolder, index) => (
                                    <tr key={index}>
                                        <td className='totalbh-body'>{index + 1}</td>
                                        <td className='totalbh-body'>{bondHolder.id}</td>
                                        <td className='totalbh-body'>{bondHolder.totalBonds}</td>
                                        <td className='totalbh-body'>{bondHolder.totalActive}</td>
                                        <td className='totalbh-body'>{bondHolder.totalRedeemed}</td>
                                        <td className='totalbh-body'>{calcularSumaPrincipalPorBondHolder(bondHolder).toFixed(3)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        
                    </div>
                )}
            </div>
        </>
    );
};
 export default DetailBondholder;

