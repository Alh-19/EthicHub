import React from "react";
import ChartStake3 from "../ComponentsStake/ChartStake3";
import ChartStake2 from "../ComponentsStake/ChartStake2";
import ChartStake1 from "../ComponentsStake/ChartStake1";
import ChartStake1B from "../ComponentsStake/ChartStake1B";
import ImageStake from "../ComponentsStake/ImageStake";
import ChartStake1C from "../ComponentsStake/ChartStake1C";
import ChartStake1D from "../ComponentsStake/ChartStake1D";
import "../Css/Stake.css"; // Import the CSS file
import DetailHoldersStake from "../ComponentsStake/ShowDetailHoldersStake";
import DetailHoldersStakeTotal from "../ComponentsStake/ShowDetailHoldersStakeTotal";

const Stake = () => {
  return (
    <div>
    <div className="stake-container">
    <h3>Stake Holders per month </h3>
      <div className="stake-row1">
        <div className="chart-container">
          <ChartStake1 />
        </div>
        <div className="chart-container">
          <ChartStake1B />
        </div>
      </div>
      <h3>Stake Holders per day </h3>
      <div className="stake-row1">
        <div className="chart-container">
          <ChartStake1D />
        </div>
        <div className="chart-container">
          <ChartStake1C />
        </div>
      </div>
      <div className="detail-ethix">
        <DetailHoldersStake />
      </div>
      <div className="stake-row2">
        <div className="image-container">
          <ImageStake />
        </div>
        <div className="chart-container-total">
        <h3>Stake holders total</h3>
          <ChartStake2 />
        </div>
      </div>
      <div className="detail-ethix">
      <DetailHoldersStakeTotal />
      </div>
      </div>
      <div className="stake-row3">
        <div className="chart-container-combined">
        <h3>Total staked per contract</h3>
          <ChartStake3 />
        </div>
      </div>
      </div>
  );
};

export default Stake;

