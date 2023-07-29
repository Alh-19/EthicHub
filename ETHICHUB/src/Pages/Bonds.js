import CombinedChart from "../Components/Bonds/CombinedChart";
import CombinedChart2 from "../Components/Bonds/CombinedChart2";
import Chart5 from "../Components/Bonds/PieChart";
import Box4 from "../Components/Bonds/Box4";
import Box5 from "../Components/Bonds/Box5";
import Box1 from "../Components/Bonds/Box1";
import Box2 from "../Components/Bonds/Box2";
import Box3 from "../Components/Bonds/Box3";
import '../Css/Bonds.css'
import DetailBondholder from "../Components/Bonds/ShowDetailPieChart";
import DetailBonds from "../Components/Bonds/ShowDetailChart";


const Bonds = () => {

  return (
    <div>

      <div className="bliquidity">
        <h3 className="bl">Bond Liquidity</h3>
        <div className="box1y2">
        <Box1 />
        <Box2 />
        <Box3 />
      </div>
      </div>
      <div className="bondholders">
        <h3 className="bh">Bond Holders</h3>
        <div className="box1y2">
          <Box4 />
          <Box5 />
        </div>
      </div>

      <div className="container">
        <div className="bonds-minted">
          <h3>Bonds minted by month</h3>
          <CombinedChart />
        </div>
        <div className="detail-ethix">
              <DetailBonds />
        </div>
        <div className="container2">
          <div className="deposited-principal">
            <h3>Total deposited by bond size</h3>
              <CombinedChart2 />
          </div>
          <div className="bond-holders">
            <h3>Bond holders total</h3>
            <Chart5 />
          </div>
        </div>
        <div className="detail-ethix">
           <DetailBondholder/>
        </div>
      </div>
    </div>

    

  );
};

export default Bonds;


