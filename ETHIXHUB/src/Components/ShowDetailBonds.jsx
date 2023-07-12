import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Bonds.css';

const DetailBonds = () => {
    const { loading, error, data } = useContext(DataContext);
    const bondsEth = data.query1Data?.bond || [];
    const bondsCelo = data.query2Data?.bond || [];
    

    
    useEffect(() => {
        if (loading) return;
        if (error) {
        console.error(`Error! ${error.message}`);
        return;
        }

    },[loading, error, bondsEth, bondsCelo]);

    return(
        <div>


            {bondsCelo.map((bond, index) => (
            <div className='bhtable' key={index}>
                <h2>total bonds {bondsCelo.length}</h2>
                <h2>{index + 1}</h2>
                <p>{bond.id}</p>
                <p>{bond.totalBonds}</p>
                <p>{bond.totalActive}</p>
                <p>{bond.totalRedeemed}</p>
                <p></p>
            </div>
        ))}



        </div>
    );
};

export default DetailBonds;

