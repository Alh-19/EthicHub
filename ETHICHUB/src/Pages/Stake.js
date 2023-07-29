import React from "react";
import ChartStake1 from "../Components/ComponentsStake/ChartStake1";
import ChartStake1B from "../Components/ComponentsStake/ChartStake1B";
import ChartStake1C from "../Components/ComponentsStake/ChartStake1C";
import ChartStake1D from "../Components/ComponentsStake/ChartStake1D";
import ChartStake2 from "../Components/ComponentsStake/ChartStake2";
import ChartStake3 from "../Components/ComponentsStake/ChartStake3";
import ImageStake from "../Components/ComponentsStake/ImageStake";
import DetailHoldersStake from "../Components/ComponentsStake/ShowDetailHoldersStake";
import DetailHoldersStakeTotal from "../Components/ComponentsStake/ShowDetailHoldersStakeTotal";
import "../Css/Stake.css"; 

const Stake = () => {
  return (
    <div>
    <div className="stake-container">
    <h3 className="title">Stake Holders per month </h3>
      <div className="stake-row1">
        <div className="chart-container">
          <ChartStake1 />
        </div>
        <div className="chart-container">
          <ChartStake1B />
        </div>
      </div>
      <h3 className="title">Stake Holders per day </h3>
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
        <h3 className="title">Stake holders total</h3>
          <ChartStake2 />
        </div>
      </div>
      <div className="detail-ethix">
      <DetailHoldersStakeTotal />
      </div>
      </div>
      <div className="stake-row3">
        <div className="chart-container-combined">
        <h3 className="title">Total staked per contract</h3>
          <ChartStake3 />
        </div>
      </div>
      </div>
  );
};

export default Stake;

