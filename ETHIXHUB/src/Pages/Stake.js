import React from "react";
import ChartStake3 from "../ComponentsStake/ChartStake3";
import DetailHoldersStake from "../ComponentsStake/ShowDetailHoldersStake";
import DetailHoldersStakeTotal from "../ComponentsStake/ShowDetailHoldersStakeTotal";




const Stake = () => {
  return (
    <div>

      <DetailHoldersStake />
      <DetailHoldersStakeTotal />
      <ChartStake3 />
      
    </div>
  );
};

export default Stake;