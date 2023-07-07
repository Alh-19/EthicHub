import React, { useState } from "react";
import Chart1 from "../Components/Chart1";
import Box1 from "../Components/Boxes";
import Chart2 from "../Components/Chart2";

const Bonds = () => {
  const [chartComponent, setChartComponent] = useState(1);

  const handleChartComponentChange = () => {
    setChartComponent(chartComponent === 1 ? 2 : 1);
  };

  return (
    <div>
      <Chart1 />
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