
import React, { useEffect, useRef, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import '../Css/Box.css'

const Box1a = () => {
    const { loading, error, data } = useContext(DataContext);
    const [currentMonthBondHolders, setCurrentMonthBondHolders] = useState([]);
    const [previousMonthBondHolders, setPreviousMonthBondHolders] = useState([]);

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }

        const { bondHolders } = data.query3Data;
        const bondTotals = {};

        bondHolders.forEach((bondHolder) => {
            bondHolder.bonds.forEach((bond) => {
                const mintingDate = new Date(bond.mintingDate * 1000); // Convertir segundos a milisegundos
                const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;
                
                if (bondTotals.hasOwnProperty(monthYear)) {
                    bondTotals[monthYear] += 1; // Sumar 1 al total existente
                } else {
                    bondTotals[monthYear] = 1; // Inicializar el total en 1 para el mes
                }
            });
        });

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const currentYear = currentDate.getFullYear();

        const currentMonthKey = `${currentMonth}/${currentYear}`;
        const previousMonthKey = `${previousMonth}/${currentYear}`;

        const currentMonthBondHolders = bondHolders.filter((bondHolder) =>
            bondHolder.bonds.some((bond) => {
                const mintingDate = new Date(bond.mintingDate * 1000);
                const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;
                return monthYear === currentMonthKey;
            })
        );

        const previousMonthBondHolders = bondHolders.filter((bondHolder) =>
            bondHolder.bonds.some((bond) => {
                const mintingDate = new Date(bond.mintingDate * 1000);
                const monthYear = `${mintingDate.getMonth() + 1}/${mintingDate.getFullYear()}`;
                return monthYear === previousMonthKey;
            })
        );

        setCurrentMonthBondHolders(currentMonthBondHolders);
        setPreviousMonthBondHolders(previousMonthBondHolders);
    }, [loading, error, data]);

    return (
        <div className='box'>
            <h5 className='titlebox'>ETH: </h5>
            <div className='boxdata'>
                <h1 className='currentbhbox'>{currentMonthBondHolders.length}</h1>
                <h2 className='previousbhbox'>Vs Last month {previousMonthBondHolders.length}</h2>
            </div>
        </div>
    );
};

export default Box1a;
