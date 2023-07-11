import React, { useEffect, useRef, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import './Box.css';

const Box2 = () => {
    const { loading, error, data } = useContext(DataContext);
    const [currentMonthBondEth, setCurrentMonthBondEth] = useState([]);
    const [previousMonthBondEth, setPreviousMonthBondEth] = useState([]);
    const [currentMonthBondCelo, setCurrentMonthBondCelo] = useState([]);
    const [previousMonthBondCelo, setPreviousMonthBondCelo] = useState([]);
    const [currentMonthPrincipalEth, setCurrentMonthPrincipalEth] = useState(0);
    const [previousMonthPrincipalEth, setPreviousMonthPrincipalEth] = useState(0);
    const [currentMonthPrincipalCelo, setCurrentMonthPrincipalCelo] = useState(0);
    const [previousMonthPrincipalCelo, setPreviousMonthPrincipalCelo] = useState(0);

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }

        const bondsEth = data.query1Data.bonds;
        const bondsCelo = data.query2Data.bonds;

        // Calcular maturityDate y principal de cada bono de Eth
        const bondsWithMaturityAndPrincipalEth = bondsEth.map((bond) => ({
            ...bond,
            maturityDate: new Date(bond.maturityDate * 1000),
            principal: parseFloat(bond.principal),
        }));

        // Calcular maturityDate y principal de cada bono de Celo
        const bondsWithMaturityAndPrincipalCelo = bondsCelo.map((bond) => ({
            ...bond,
            maturityDate: new Date(bond.maturityDate * 1000),
            principal: parseFloat(bond.principal),
        }));

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const currentYear = currentDate.getFullYear();

        const currentMonthBondEth = bondsWithMaturityAndPrincipalEth.filter((bond) =>
            bond.maturityDate.getMonth() + 1 === currentMonth && bond.maturityDate.getFullYear() === currentYear
        );

        const previousMonthBondEth = bondsWithMaturityAndPrincipalEth.filter((bond) =>
            bond.maturityDate.getMonth() + 1 === previousMonth && bond.maturityDate.getFullYear() === currentYear
        );

        const currentMonthBondCelo = bondsWithMaturityAndPrincipalCelo.filter((bond) =>
            bond.maturityDate.getMonth() + 1 === currentMonth && bond.maturityDate.getFullYear() === currentYear
        );

        const previousMonthBondCelo = bondsWithMaturityAndPrincipalCelo.filter((bond) =>
            bond.maturityDate.getMonth() + 1 === previousMonth && bond.maturityDate.getFullYear() === currentYear
        );

        const currentMonthPrincipalEth = currentMonthBondEth.reduce(
            (total, bond) => total + bond.principal,
            0
        );

        const previousMonthPrincipalEth = previousMonthBondEth.reduce(
            (total, bond) => total + bond.principal,
            0
        );

        const currentMonthPrincipalCelo = currentMonthBondCelo.reduce(
            (total, bond) => total + bond.principal,
            0
        );

        const previousMonthPrincipalCelo = previousMonthBondCelo.reduce(
            (total, bond) => total + bond.principal,
            0
        );

        setCurrentMonthBondEth(currentMonthBondEth);
        setPreviousMonthBondEth(previousMonthBondEth);
        setCurrentMonthBondCelo(currentMonthBondCelo);
        setPreviousMonthBondCelo(previousMonthBondCelo);
        setCurrentMonthPrincipalEth(currentMonthPrincipalEth);
        setPreviousMonthPrincipalEth(previousMonthPrincipalEth);
        setCurrentMonthPrincipalCelo(currentMonthPrincipalCelo);
        setPreviousMonthPrincipalCelo(previousMonthPrincipalCelo);
    }, [loading, error, data]);

    return (
        <div className='boxliquidity'>
            <div className="boxmature">
                <h5 className='titletomature'>Bonds to mature this month:</h5>
                <div className='month'>
                    <h3 className='h3s1'>ETH {currentMonthPrincipalEth.toFixed(3)}</h3>
                    <h3 className='h3s2'>CELO {currentMonthPrincipalCelo.toFixed(3)}</h3>
                </div>
            </div>
            <div className="boxmature">
                <h5 className='titletomature'>Bonds matured this month:</h5>
                <div className='month'>
                    <h3 className='h3s1'>ETH {previousMonthPrincipalEth.toFixed(3)}</h3>
                    <h3 className='h3s2'>CELO {previousMonthPrincipalCelo.toFixed(3)}</h3>
                </div>
            </div>
            {/* <h1>Bonds Eth este mes: {currentMonthBondEth.length}</h1>
            <h2>Bonds Eth mes pasado: {previousMonthBondEth.length}</h2> */}
            {/* <h5>Bonds Celo este mes: {currentMonthBondCelo.length}</h5>
            <h6>Bonds Celo mes pasado: {previousMonthBondCelo.length}</h6> */}
        </div>
    );
};

export default Box2;