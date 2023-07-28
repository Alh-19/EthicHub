import React from "react";
import ChartEthix1 from "../ComponentsEthix/ChartEthix1";
import ChartEthix2 from "../ComponentsEthix/ChartEthix2";
import ChartEthix3 from "../ComponentsEthix/ChartEthix3";
import ChartEthix4 from "../ComponentsEthix/ChartEthix4";
import ChartEthix5 from "../ComponentsEthix/ChartEthix5";
import ImageEthix from "../ComponentsEthix/ImageEthix";
import "../Css/Ethix.css"; // Import the CSS file
import DetailBondHoldersEthixTotal from "../ComponentsEthix/ShowDetailHoldersEthixTotal";


const Ethix = () => {
  return (
    <div className="ethix-container">
      <div className="ethix-row">
        <div className="chart-container">
          <ChartEthix1 />
        </div>
        <div className="chart-container">
          <ChartEthix2 />
        </div>
      </div>
      <div className="ethix-row">
        <div className="chart-container">
          <ChartEthix4 />
        </div>
        <div className="chart-container">
          <ChartEthix5 />
        </div>
      </div>
      <div className="ethix-row">
        <div className="image-container">
          <ImageEthix />
        </div>
        <div className="chart-container">
          <ChartEthix3 />
        </div>
        <DetailBondHoldersEthixTotal />
      </div>
    </div>
  );
};

export default Ethix;
