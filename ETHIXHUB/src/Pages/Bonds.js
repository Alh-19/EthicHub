import CombinedChart from "../Components/CombinedChart";
import CombinedChart2 from "../Components/CombinedChart2";
import Chart5 from "../Components/Chart5";
import Box1a from "../Components/Box1a";
import Box1b from "../Components/Box1b";
import Box1 from "../Components/Box1";
import Box2 from "../Components/Box2";
import Box3 from "../Components/Box3";
import '../Css/Bonds.css';
import DetailBondholder from "../Components/ShowDetailBondholder";
import DetailBonds from "../Components/ShowDetailBonds";


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
          <Box1a />
          <Box1b />
        </div>
      </div>

      <div className="container">

        <div className="bonds-minted">
          <h3>Amount f bonds minted by month</h3>
          <CombinedChart />
        </div>

        <div className="container2">
          <div className="deposited-principal">
            <h3>Deposited principal by bond size</h3>
            <CombinedChart2 />
          </div>

          <div className="bond-holders">
            <h3>Bond holders</h3>
            <Chart5 />
            <DetailBondholder />
          </div>
          
        </div>
        <DetailBonds />
      </div>

    </div>
  );
};

export default Bonds;


