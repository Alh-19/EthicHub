import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';
import Big from "big.js";

const DetailBonds = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondsEth = data.query1Data.bonds || [];
    const bondsCelo = data.query2Data.bonds || [];
    const [sumaPrincipalEth, setSumaPrincipalEth] = useState(0);
    const [sumaPrincipalCelo, setSumaPrincipalCelo] = useState(0);
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

        
    },[loading, error, bondsEth, bondsCelo]);


    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };

    const toggleView = () => {
        setShowEth(!showEth);
    };

    const activeBonds = showEth ? bondsEth : bondsCelo;

    const secondsToMonths = (seconds) => {
        const secondsInAMonth = 2592000;
        return Math.round(seconds / secondsInAMonth);
    };

    activeBonds.map((bonds) => {

    })

    const countBondsWithRedeemDate = () => {
        let count = 0;
        activeBonds.forEach((bond) => {
            if (bond.redeemDate !== null && bond.redeemDate !== '') {
                count++;
            }
        });
        return count;
    };

    const calculateTotalActive = () => {
        return activeBonds.length - countBondsWithRedeemDate();
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

                <h2>TOTAL MINTED {activeBonds.length}</h2>
                <h2>TOTAL ACTIVE {calculateTotalActive()}</h2>
                <h2> TOTAL REDEEMED {countBondsWithRedeemDate()}</h2>
                
                <h2>Principal invested: </h2>

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

                {activeBonds.map((bonds, index) => {
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
                    <p>{months}</p>
                    <p>{interestAnual()}%</p>
                    <p>{bonds.principal}</p>
                    <p>{yieldValor.toFixed()}</p>
                    <p>{withdrawn}</p>
                    <p>{maturityDate}</p>
                    <p>{mintingDate}</p>
                    <p>{redeemDate}</p>
                    <p>{}</p>
                </div>
                )
                })}

            </div>
            )}

        </div>
    );
};

export default DetailBonds;


