import React, { useEffect, useRef, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';

const Box1 = () =>{
    const { loading, error, data } = useContext(DataContext);
    const soldBonds = data.query1Data.bonds

    // const totalWithdrawnSum = soldBonds.reduce((acc, bond) => {
    //     const withdrawn = bond.withdrawn;
    //     const withdrawnNumber = typeof withdrawn === 'number' ? withdrawn : 0;
    //     return acc + withdrawnNumber;
    //   }, 0);
    
    return(
        <>
            {/* <div>Total Withdrawn: {totalWithdrawnSum} </div> */}
        </>
    )
}

export default Box1