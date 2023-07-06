import React, { useState } from "react";
import Chart1 from "../Components/Chart1";
import Chart2 from "../Components/Chart2";

const Bonds = () => {
  const [chartComponent, setChartComponent] = useState(1);

  const handleChartComponentChange = () => {
    setChartComponent(chartComponent === 1 ? 2 : 1);
  };

  return (
    <div>
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