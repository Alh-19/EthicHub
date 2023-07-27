import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import Big from 'big.js';

const Box1 = () => {
    const { loading, error, data } = useContext(DataContext);
    const [workingCapitalEth, setWorkingCapitalEth] = useState(Big(0)); // State for ETH working capital
    const [workingCapitalCelo, setWorkingCapitalCelo] = useState(Big(0)); // State for CELO working capital

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }

        const bondsEth = data.query1Data.bonds;
        const bondsCelo = data.query2Data.bonds;
// Calculate working capital for ETH by summing all the "principal" values of ETH bonds
        const workingCapitalEth = bondsEth.reduce((total, bond) => {
            if (bond.redeemDate === null) {
              return total.plus(bond.principal);
            }
            return total;
          }, Big(0));
          setWorkingCapitalEth(workingCapitalEth);

        // Calculate working capital for CELO by summing all the "principal" values of CELO bonds
        const workingCapitalCelo = bondsCelo.reduce((total, bond) => {
            if (bond.redeemDate === null) {
              return total.plus(bond.principal);
            }
            return total;
          }, Big(0));
          setWorkingCapitalCelo(workingCapitalCelo);
    }, [loading, error, data]);


    return (
        <div className='boxliquidity'>
            <div className="boxmature">
                <h5 className='titletomature'>ETH Working Capital:</h5>
                <div className='month'>
                    <h3 className='h3s1'>ETH: {workingCapitalEth.toFixed(3)}</h3> 
                    <h3 className='h3s2'>CELO: {workingCapitalCelo.toFixed(3)}</h3>
                </div> 
            </div>
        </div>
    );
};

export default Box1;