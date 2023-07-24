import React from "react";
import '../Css/Bonds.css';
import DetailBondHoldersEthix from "../ComponentsEthix/ShowDetailBondHoldersEthix";
import ChartEhix1 from "../ComponentsEthix/ChartEthix1";


const Ethix = () => {
  return (
    <div>


      <ChartEhix1 />

      <DetailBondHoldersEthix />
    
    </div>
  );
};

export default Ethix;