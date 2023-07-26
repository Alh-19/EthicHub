import React from "react";
import ChartEthix1 from "../ComponentsEthix/ChartEthix1";
import ChartEthix2 from "../ComponentsEthix/ChartEthix2";
import DetailBondHoldersEthix from "../ComponentsEthix/ShowDetailHoldersEthix";

const Ethix = () => {
  return (
    <div>
    <ChartEthix1 />
    <ChartEthix2 />
    <DetailBondHoldersEthix />
    </div>
  );
};

export default Ethix;