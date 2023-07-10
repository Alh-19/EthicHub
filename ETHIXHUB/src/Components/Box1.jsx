import React, { useEffect, useRef, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';

const Box1 = () =>{
    const { loading, error, data } = useContext(DataContext);
    
    const [holdersEth, setHoldersEth] = useState(0);
    const [holdersCelo, setHoldersCelo] = useState(0);
    

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }

        const calculateTotalBondHoldersEth = () => {
            const bondHoldersethCount = data.query3Data?.bondHolders.length || 0;
            return bondHoldersethCount ;
        };
        console.log(data)

        const total = calculateTotalBondHoldersEth();
        setHoldersEth(total);
        console.log(total);
    
        const calculateTotalBondHoldersCelo = () => {
            const bondHoldersceloCount = data.query4Data?.bondHolders.length || 0;
            return bondHoldersceloCount ;
        };

        const total2 = calculateTotalBondHoldersCelo();
        setHoldersCelo(total2);
        console.log(total2);
    

    }, [loading, error, data]);

    return (
        <div>
            <h1>Bond Holders Eth: {holdersEth}</h1>
            <h2>Bond Holders Celo: {holdersCelo}</h2>
        </div>
    );
};
    
    export default Box1;

