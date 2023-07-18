
import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";

const DetailBonds = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondsEth = data.query1Data?.bonds || [];
    const bondsCelo = data.query2Data?.bonds || [];
    const [showDetail, setShowDetail] = useState(false);
    const [showEth, setShowEth] = useState(true);
    const [showAllBonds, setShowAllBonds] = useState(false);
    const [showRedeemedBonds, setShowRedeemedBonds] = useState(false);
    const [showMaturedBonds, setShowMaturedBonds] = useState(false);
    const [showActiveBonds, setShowActiveBonds] = useState(false);
    
    console.log(bondsEth)
    console.log(bondsCelo)

    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, bondsEth, bondsCelo]);

    //funcion para ver el detail
    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };

    //funcion para cambiar la vita de Eth a Celo
    const toggleView = () => {
        setShowEth(!showEth);
    };

    const activeAllBonds = showEth ? bondsEth : bondsCelo;
    
    //funcion para pasar numeros a fecha
    const secondsToMonths = (seconds) => {
        const secondsInAMonth = 2592000;
        return Math.round(seconds / secondsInAMonth);
    };

    const countBondsWithRedeemDate = () => {
        let count = 0;
        activeAllBonds.forEach((bond) => {
            if (bond.redeemDate !== null && bond.redeemDate !== '') {
                count++;
            }
        });
        return count;
    };

    //CANTIDAD DE BONDS ACTIVOS
    const calculateTotalActive = () => {
        return activeAllBonds.length - countBondsWithRedeemDate();
    };

    const calculateTotalPrincipal = () => {
        let total = 0;
        activeAllBonds.forEach((bond) => {
            total += parseFloat(bond.principal);
        });
        return total;
    };

    const calculateTotalWithdrawn = () => {
        let total = 0;
        activeAllBonds.forEach((bond) => {
            if (bond.withdrawn) {
                total += parseFloat(bond.withdrawn);
            }
        });
        return total;
    };

    const calculateTotalYield = () => {
        const totalYield = activeAllBonds.reduce((acc, bond) => {
            const interest = Big(bond.maturity).mul(bond.interest).div("1e18");
            const yieldValor = Big(interest).mul(Big(bond.principal)).mul("0.01");
            return acc.plus(yieldValor);
        }, Big(0));
        return totalYield.toFixed(4);
    };

    // BOTONES DEL TOGGLE ENTRE MODOS DE VISTA

    const toggleAllBonds = () => {
        setShowAllBonds(!showAllBonds); 
        setShowRedeemedBonds(false); 
        setShowMaturedBonds(false);
        setShowActiveBonds(false);
    };

    const toggleRedeemedBonds = () => {
        setShowRedeemedBonds(!showRedeemedBonds); 
        setShowAllBonds(false);
        setShowMaturedBonds(false);
        setShowActiveBonds(false);
    };

    const toggleMaturedBonds = () => {
        setShowMaturedBonds(!showMaturedBonds); 
        setShowAllBonds(false); 
        setShowRedeemedBonds(false);
        setShowActiveBonds(false);
    };

    const toggleActiveBonds = () => {
        setShowActiveBonds(!showActiveBonds); 
        setShowAllBonds(false); 
        setShowRedeemedBonds(false);
        setShowMaturedBonds(false);
    };

    const redeemedBonds = activeAllBonds.filter(bonds => bonds.redeemDate !== null && bonds.redeemDate !== '');

    const maturedAndActiveBonds = activeAllBonds.filter((bonds) =>
        new Date(bonds.maturityDate * 1000) <= new Date() && // Madurados
        (bonds.redeemDate === null || bonds.redeemDate === '') // No redimidos
    );

    const detailActiveBonds = activeAllBonds.filter((bond) => !bond.redeemDate);

    const calculateTotalPrincipalActive = () => {
        let total = 0;
        detailActiveBonds.forEach((bond) => {
            total += parseFloat(bond.principal);
        });
        return total.toFixed(4);
    };

    const calculateTotalPrincipalMatured = () => {
        let total = 0;
        maturedAndActiveBonds.forEach((bond) => {
            total += parseFloat(bond.principal);
        });
        return total.toFixed(4);
    };

    const calculateTotalYieldMatured = () => {
        const totalYield = maturedAndActiveBonds.reduce((acc, bond) => {
            const interest = Big(bond.maturity).mul(bond.interest).div("1e18");
            const yieldValor = Big(interest).mul(Big(bond.principal)).mul("0.01");
            return acc.plus(yieldValor);
        }, Big(0));
        return totalYield.toFixed(4);
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

                <h2>TOTAL MINTED {activeAllBonds.length}</h2>
                <h2>TOTAL ACTIVE {calculateTotalActive()}</h2>
                <h2> TOTAL REDEEMED {countBondsWithRedeemDate()}</h2>

                <div className='btshow'>
                    <button className="butonshow2" onClick={toggleAllBonds}>
                    {showAllBonds ? 'Hide All Bonds' : 'Show All Bonds'}
                    </button>
                </div>

                <div className='btshow'>
                    <button className="butonshow2" onClick={toggleActiveBonds}>
                    {showActiveBonds ? 'Hide Active Bonds' : 'Show Active Bonds'}
                    </button>
                </div>

                <div className='btshow'>
                    <button className="butonshow2" onClick={toggleMaturedBonds}>
                    {showMaturedBonds ? 'Hide Matured Bonds' : 'Show Matured Bonds'}
                    </button>
                </div>

                <div className='btshow'>
                    <button className="butonshow2" onClick={toggleRedeemedBonds}>
                    {showRedeemedBonds ? 'Hide Redeemed Bonds' : 'Show Redeemed Bonds'}
                    </button>
                </div>

                {/* All bonds detail */}
                {showAllBonds && (
                    <div>
                        <div>
                            <h2>Total Principal Invested: {calculateTotalPrincipal().toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h2>
                            <h2>Total Yield Generated: {calculateTotalYield()} {showEth ? '(DAI)' : '(cUSD)'}</h2>
                            <h2>Total Principal Withdrawn: {calculateTotalWithdrawn().toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h2>
                        </div>

                        <div className='bhtable'>
                            <p>Token ID:</p>
                            <p>Type:</p>
                            <p>Maturity:</p>
                            <p>APR:</p>
                            <p>Principal {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Yield {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Withdrawn {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Minting date:</p>
                            <p>Maturity date:</p>
                            <p>Redeem date:</p>
                        </div>

                        {activeAllBonds.map((bonds, index) => {
                            const months = secondsToMonths(bonds.maturity);
                            const mintingDate = new Date(bonds.mintingDate * 1000).toDateString();
                            const maturityDate = new Date(bonds.maturityDate * 1000).toDateString(); 
                            const withdrawn = bonds.withdrawn ? (bonds.withdrawn).toString() : "-";
                            const redeemDate = bonds.redeemDate ? new Date(bonds.redeemDate * 1000).toDateString() : "-";
                            const interest = Big(bonds.maturity).mul(bonds.interest).div("1e18"); 
                            const interestAnual = () => {
                                const porcentaje = interest.toFixed(1);
                                if (porcentaje === "9.0") {
                                    return "9.0";
                                } else if (porcentaje === "3.5") {
                                    return (Big(porcentaje).mul("2")).toString();
                                } else if (porcentaje === "1.5") {
                                    return (Big(porcentaje).mul("4")).toString();
                                } else {
                                    return "N/A";
                                }
                            };
                            const yieldValor = Big(interest).mul(Big(bonds.principal)).mul("0.01");
                            return(
                                <div className='bhtable' key={index}>
                                    <p>{bonds.id}</p>
                                    <p>{bonds.size}</p>
                                    <p>{months} months</p>
                                    <p>{interestAnual()}%</p>
                                    <p>{bonds.principal}</p>
                                    <p>{yieldValor.toFixed()}</p>
                                    <p>{withdrawn}</p>
                                    <p>{maturityDate}</p>
                                    <p>{mintingDate}</p>
                                    <p>{redeemDate}</p>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Active bonds detail */}
                {showActiveBonds && (
                    <div>

                        <h2> Total Principal Active {calculateTotalPrincipalActive()}{showEth ? '(DAI)' : '(cUSD)'}</h2>

                        <div className='bhtable'>
                            <h2>Nº:</h2>
                            <p>Token Id:</p>
                            <p>Type:</p>
                            <p>Maturity</p>
                            <p>APR</p>
                            <p>Principal {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Yield {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Maturity date:</p>
                        </div>

                        {detailActiveBonds.map((bonds, index) =>{
                            const maturityDate = new Date(bonds.maturityDate * 1000).toDateString();
                            const months = secondsToMonths(bonds.maturity);
                            const interest = Big(bonds.maturity).mul(bonds.interest).div("1e18"); 
                            const interestAnual = () => {
                                const porcentaje = interest.toFixed(1);
                                if (porcentaje === "9.0") {
                                    return "9.0";
                                } else if (porcentaje === "3.5") {
                                    return (Big(porcentaje).mul("2")).toString();
                                } else if (porcentaje === "1.5") {
                                    return (Big(porcentaje).mul("4")).toString();
                                } else {
                                    return "N/A";
                                }
                            };
                            const yieldValor = Big(interest).mul(Big(bonds.principal)).mul("0.01");
                            return(
                                <div className='bhtable' key={index}>
                                    <h2>{index + 1}</h2>
                                    <p>{bonds.id}</p>
                                    <p>{bonds.size}</p>
                                    <p>{months} months</p>
                                    <p>{interestAnual()}%</p>
                                    <p>{bonds.principal}</p>
                                    <p>{yieldValor.toFixed()}</p>
                                    <p>{maturityDate}</p>
                                </div>
                            )
                        })}

                    </div>
                )}

                {/* MATURED bonds detail */}
                {showMaturedBonds && (
                    <div>

                        <h2> Total Principal Matured {calculateTotalPrincipalMatured()}{showEth ? '(DAI)' : '(cUSD)'}</h2>
                        <h2> Total Yield Matured {calculateTotalYieldMatured()}{showEth ? '(DAI)' : '(cUSD)'}</h2>

                        <div className='bhtable'>
                            <h2>Nº:</h2>
                            <p>Token Id:</p>
                            <p>Type:</p>
                            <p>Maturity</p>
                            <p>APR</p>
                            <p>Principal {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Yield {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Maturity date:</p>
                        </div>

                        {maturedAndActiveBonds.map((bonds, index) => {
                            const maturityDate = new Date(bonds.maturityDate * 1000).toDateString();
                            const months = secondsToMonths(bonds.maturity);
                            const interest = Big(bonds.maturity).mul(bonds.interest).div("1e18"); 
                            const interestAnual = () => {
                                const porcentaje = interest.toFixed(1);
                                if (porcentaje === "9.0") {
                                    return "9.0";
                                } else if (porcentaje === "3.5") {
                                    return (Big(porcentaje).mul("2")).toString();
                                } else if (porcentaje === "1.5") {
                                    return (Big(porcentaje).mul("4")).toString();
                                } else {
                                    return "N/A";
                                }
                            };
                            const yieldValor = Big(interest).mul(Big(bonds.principal)).mul("0.01");
                            return (
                                <div className='bhtable' key={index}>
                                    <h2>{index + 1}</h2>
                                    <p>{bonds.id}</p>
                                    <p>{bonds.size}</p>
                                    <p>{months} months</p>
                                    <p>{interestAnual()}%</p>
                                    <p>{bonds.principal}</p>
                                    <p>{yieldValor.toFixed()}</p>
                                    <p>{maturityDate}</p>
                                </div>
                            )
                        })}

                    </div>
                )}

                {/* REDEEMED bonds detail */}
                {showRedeemedBonds && (
                    <div>
                        
                        <h2>Total Principal Withdrawn: {calculateTotalWithdrawn().toFixed(3)} {showEth ? '(DAI)' : '(cUSD)'}</h2>

                        <div className='bhtable'>
                            <h2>Nº:</h2>
                            <p>Token Id:</p>
                            <p>Type</p>
                            <p>Maturity:</p>
                            <p>APR:</p>
                            <p>Principal {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Yield {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Withdrawn {showEth ? '(DAI)' : '(cUSD)'}:</p>
                            <p>Redeem date:</p>
                        </div>

                        {redeemedBonds.map((bonds, index) => {
                            const months = secondsToMonths(bonds.maturity);
                            const interest = Big(bonds.maturity).mul(bonds.interest).div("1e18"); 
                            const interestAnual = () => {
                            const porcentaje = interest.toFixed(1);
                                if (porcentaje === "9.0") {
                                    return "9.0";
                                } else if (porcentaje === "3.5") {
                                    return (Big(porcentaje).mul("2")).toString();
                                } else if (porcentaje === "1.5") {
                                    return (Big(porcentaje).mul("4")).toString();
                                } else {
                                    return "N/A";
                                }                                    
                            };
                            const yieldValor = Big(interest).mul(Big(bonds.principal)).mul("0.01");
                            const redeemDate = bonds.redeemDate ? new Date(bonds.redeemDate * 1000).toDateString() : "-";
                            const withdrawn = bonds.withdrawn ? (bonds.withdrawn).toString() : "-";
                            return(
                                <div className='bhtable' key={index}>
                                    <h2>{index + 1}</h2>
                                    <p>{bonds.id}</p>
                                    <p>{bonds.size}</p>
                                    <p>{months} months</p>
                                    <p>{interestAnual()}%</p>
                                    <p>{bonds.principal}</p>
                                    <p>{yieldValor.toFixed()}</p>
                                    <p>{withdrawn}</p>
                                    <p>{redeemDate}</p>
                                </div>
                            )
                        })}
                    </div>
                )}

            </div>
            )}

        </div>
    );
};

export default DetailBonds;


