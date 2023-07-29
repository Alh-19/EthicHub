import CombinedChart from "../Components/ComponentsBonds/CombinedChart";
import CombinedChart2 from "../Components/ComponentsBonds/CombinedChart2";
import Chart5 from "../Components/ComponentsBonds/PieChart";
import Box1 from "../Components/ComponentsBonds/Box1";
import Box2 from "../Components/ComponentsBonds/Box2";
import Box3 from "../Components/ComponentsBonds/Box3";
import Box4 from "../Components/ComponentsBonds/Box4";
import Box5 from "../Components/ComponentsBonds/Box5";
import '../Css/Bonds.css'
import DetailBondholder from "../Components/ComponentsBonds/ShowDetailPieChart";
import DetailBonds from "../Components/ComponentsBonds/ShowDetailChart";


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


