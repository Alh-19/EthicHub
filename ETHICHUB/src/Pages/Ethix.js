import React from "react";
import ChartEthix1 from "../Components/ComponentsEthix/ChartEthix1";
import ChartEthix2 from "../Components/ComponentsEthix/ChartEthix2";
import ChartEthix3 from "../Components/ComponentsEthix/ChartEthix3";
import ChartEthix4 from "../Components/ComponentsEthix/ChartEthix4";
import ChartEthix5 from "../Components/ComponentsEthix/ChartEthix5";
import ImageEthix from "../Components/ComponentsEthix/ImageEthix";
import "../Css/Ethix.css"; 
import DetailBondHoldersEthixTotal from "../Components/ComponentsEthix/ShowDetailHoldersEthixTotal.jsx";


const Ethix = () => {
  return (
    <div className="ethix-container">
      <h3 className="title">Ethix Holders per month </h3>
       
      <div className="ethix-row">
        <div className="chart-container">
          <ChartEthix1 />
        </div>
        <div className="chart-container">
          <ChartEthix2 />
        </div>
      </div>
      
      <h3 className="title">Ethix Holders per month </h3>
      <div className="ethix-row">
        <div className="chart-container">
          <ChartEthix4 />
        </div>
        <div className="chart-container">
          <ChartEthix5 />
        </div>
      </div>
      <div className="detail-ethix">

      </div>
     
      <div className="ethix-row">
        <div className="image-container">
          <ImageEthix />
        </div>
        <div className="chart-container-total">
        <h3 className="title">Ethix holders total</h3>
          <ChartEthix3 />
        </div>
      </div>
       <div className="detail-ethix">
      <DetailBondHoldersEthixTotal />
      </div>
    </div>
  );
};

export default Ethix;
