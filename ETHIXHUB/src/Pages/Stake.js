import React from "react";
import ChartStake3 from "../ComponentsStake/ChartStake3";
import ChartStake2 from "../ComponentsStake/ChartStake2";
import ChartStake1 from "../ComponentsStake/ChartStake1";
import ChartStake1B from "../ComponentsStake/ChartStake1D";
import ImageEthix from "../ComponentsEthix/ImageEthix";
import "../Css/Stake.css"; // Import the CSS file

const Stake = () => {
  return (
    <div className="stake-container">
      <div className="stake-row1">
        <div className="chart-container">
          <ChartStake1 />
        </div>
        <div className="chart-container">
          <ChartStake1B />
        </div>
      </div>
      <div className="stake-row2">
        <div className="image-container">
          <ImageEthix />
        </div>
        <div className="chart-container">
          <ChartStake2 />
        </div>
      </div>
      <div className="stake-row3">
        <div className="chart-container">
          <ChartStake3 />
        </div>
      </div>
    </div>
  );
};

export default Stake;

