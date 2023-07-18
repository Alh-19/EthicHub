/*import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import Big from 'big.js';
import '../Css/Box.css';

const Box2 = () => {
  const { loading, error, data } = useContext(DataContext);
  const [nextMonthTotalPrincipalEth, setNextMonthTotalPrincipalEth] = useState(Big(0));
  const [nextMonthTotalPrincipalCelo, setNextMonthTotalPrincipalCelo] = useState(Big(0));
  const [noBondsNextMonthEth, setNoBondsNextMonthEth] = useState(false);
  const [noBondsNextMonthCelo, setNoBondsNextMonthCelo] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bondsEth = data.query1Data.bonds;
    const bondsCelo = data.query2Data.bonds;

    const bondsWithMaturityAndPrincipalEth = bondsEth.map((bond) => ({
      ...bond,
      maturityDate: new Date(bond.maturityDate * 1000),
      principal: Big(bond.principal),
      interest: Big(bond.interest),
    }));

    const bondsWithMaturityAndPrincipalCelo = bondsCelo.map((bond) => ({
      ...bond,
      maturityDate: new Date(bond.maturityDate * 1000),
      principal: Big(bond.principal),
      interest: Big(bond.interest),
    }));

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const currentYear = currentDate.getFullYear();

    const nextMonthBondsEth = bondsWithMaturityAndPrincipalEth.filter((bond) => {
      const bondMonth = bond.maturityDate.getMonth() + 1;
      const bondYear = bond.maturityDate.getFullYear();
      return bondMonth === nextMonth && bondYear === currentYear;
    });

    const nextMonthBondsCelo = bondsWithMaturityAndPrincipalCelo.filter((bond) => {
      const bondMonth = bond.maturityDate.getMonth() + 1;
      const bondYear = bond.maturityDate.getFullYear();
      return bondMonth === nextMonth && bondYear === currentYear;
    });

    const nextMonthTotalPrincipalEth = nextMonthBondsEth.reduce(
      (total, bond) => total.plus(bond.principal).plus(bond.interest),
      Big(0)
    );

    const nextMonthTotalPrincipalCelo = nextMonthBondsCelo.reduce(
      (total, bond) => total.plus(bond.principal).plus(bond.interest),
      Big(0)
    );

    setNextMonthTotalPrincipalEth(nextMonthTotalPrincipalEth);
    setNextMonthTotalPrincipalCelo(nextMonthTotalPrincipalCelo);
    setNoBondsNextMonthEth(nextMonthBondsEth.length === 0);
    setNoBondsNextMonthCelo(nextMonthBondsCelo.length === 0);
  }, [loading, error, data]);

  return (
    <div className='boxliquidity'>
      <div className="boxmature">
        <h5 className='titletomature'>Next month's total principal and interest:</h5>
        <div className='month'>
          {!noBondsNextMonthEth && <h3 className='h3s1'>ETH {nextMonthTotalPrincipalEth.toFixed(3)} DAI</h3>}
          {noBondsNextMonthEth && <div>No ETH bonds maturing next month.</div>}
          {!noBondsNextMonthCelo && <h3 className='h3s2'>CELO {nextMonthTotalPrincipalCelo.toFixed(3)} cUSD</h3>}
          {noBondsNextMonthCelo && <div>No CELO bonds maturing next month.</div>}
          {noBondsNextMonthEth && noBondsNextMonthCelo && <div>No bonds maturing next month.</div>}
        </div>
      </div>
    </div>
  );
};

export default Box2;*/

import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Data/DataContextProvider';
import Big from 'big.js';
import '../Css/Box.css';

const Box2 = () => {
  const { loading, error, data } = useContext(DataContext);
  const [nextMonthTotalValueEth, setNextMonthTotalValueEth] = useState(Big(0));
  const [nextMonthTotalValueCelo, setNextMonthTotalValueCelo] = useState(Big(0));
  const [noBondsNextMonth, setNoBondsNextMonth] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(`Error! ${error.message}`);
      return;
    }

    const bondsEth = data.query1Data.bonds;
    const bondsCelo = data.query2Data.bonds;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const currentYear = currentDate.getFullYear();

    const nextMonthBondsEth = bondsEth.filter((bond) => {
      const maturityDate = new Date(Number(bond.maturityDate) * 1000);
      const bondMonth = maturityDate.getMonth() + 1;
      const bondYear = maturityDate.getFullYear();
      return bondMonth === nextMonth && bondYear === currentYear;
    });

    const nextMonthBondsCelo = bondsCelo.filter((bond) => {
      const maturityDate = new Date(Number(bond.maturityDate) * 1000);
      const bondMonth = maturityDate.getMonth() + 1;
      const bondYear = maturityDate.getFullYear();
      return bondMonth === nextMonth && bondYear === currentYear;
    });

    if (nextMonthBondsEth.length === 0 && nextMonthBondsCelo.length === 0) {
      setNoBondsNextMonth(true);
      return;
    }

    let nextMonthTotalValueEth = Big(0);
    let nextMonthTotalValueCelo = Big(0);

    nextMonthBondsEth.forEach((bond) => {
      const maturityInSeconds = Number(bond.maturity);
      const interestPerSecond = Number(bond.interest);

      const interest = Big(maturityInSeconds)
        .mul(interestPerSecond)
        .div("1e18");

      const principal = Big(bond.principal);
      const yieldAmount = interest.mul(principal).mul(0.01);
      const totalValue = principal.plus(yieldAmount);

      nextMonthTotalValueEth = nextMonthTotalValueEth.plus(totalValue);
    });

    nextMonthBondsCelo.forEach((bond) => {
      const maturityInSeconds = Number(bond.maturity);
      const interestPerSecond = Number(bond.interest);

      const interest = Big(maturityInSeconds)
        .mul(interestPerSecond)
        .div("1e18");

      const principal = Big(bond.principal);
      const yieldAmount = interest.mul(principal).mul(0.01);
      const totalValue = principal.plus(yieldAmount);

      nextMonthTotalValueCelo = nextMonthTotalValueCelo.plus(totalValue);
    });

    setNextMonthTotalValueEth(nextMonthTotalValueEth);
    setNextMonthTotalValueCelo(nextMonthTotalValueCelo);
    setNoBondsNextMonth(false);
  }, [loading, error, data]);

  return (
    <div className='boxliquidity'>
      <div className="boxmature">
        <h5 className='titletomature'>Next month's total principal and interest:</h5>
        <div className='month'>
          {!noBondsNextMonth && (
            <>
              <h3 className='h3s1'>ETH: {nextMonthTotalValueEth.toFixed(3)} DAI</h3>
              <h3 className='h3s2'>CELO: {nextMonthTotalValueCelo.toFixed(3)} cUSD</h3>
            </>
          )}
          {noBondsNextMonth && <div>No bonds maturing next month.</div>}
        </div>
      </div>
    </div>
  );
};

export default Box2;
