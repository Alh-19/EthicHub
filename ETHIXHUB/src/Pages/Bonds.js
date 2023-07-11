import React, { useState } from "react";
import Chart1 from "../Components/Chart1";
import Chart2 from "../Components/Chart2";
import Chart3 from "../Components/Chart3";
import Chart4 from "../Components/Chart4";
import CombinedChart from "../Components/CombinedChart";
import Box1a from "../Components/Box1a";
import Box1b from "../Components/Box1b";
import '../Components/Box.css'
import Box2 from "../Components/Box2";

const Bonds = () => {
  const [chartComponent, setChartComponent] = useState(1);

  const handleChartComponentChange = () => {
    setChartComponent(chartComponent === 1 ? 2 : 1);
  };

  return (
    <div>
      <div className="bondholders">
        <h1 className="bh">Bond Holders</h1>
        <div className="box1y2">
          <Box1a />
          <Box1b />
        </div>
      </div>
      <div className="bliquidity">
        <h1 className="bl">Bond Liquidity</h1>
        <Box2 />
      </div>
      
      <Chart3 />
      <Chart4 />
      <CombinedChart />
      <label>
        ETH
        <input
          type="radio"
          value={1}
          checked={chartComponent === 1}
          onChange={handleChartComponentChange}
        />
      </label>
      <label>
        CELO
        <input
          type="radio"
          value={2}
          checked={chartComponent === 2}
          onChange={handleChartComponentChange}
        />
      </label>
      {chartComponent === 1 ? <Chart1 /> : <Chart2 />}
    </div>
  );
};

export default Bonds;




//const [chartcomponent, Setchartcomponent] = useState(1);

// const handleChartomponentChange = () => {
//    Setchartcomponent(chartcomponent === 1 ? 2 : 1);
// };
//return (
//    <div>
//      {/* Botón para cambiar de componente */}
//      <button onClick={handleChartomponentChange}>Cambiar componente</button>
//
//      {/* Renderizar el componente correspondiente según el estado actual */}
//      {chartcomponent === 1 ? <Component1 /> : <Component2 />}
//    </div>
//  );