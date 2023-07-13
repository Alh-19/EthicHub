import CombinedChart from "../Components/CombinedChart";
import CombinedChart2 from "../Components/CombinedChart2";
import Chart5 from "../Components/Chart5";
import Box1a from "../Components/Box1a";
import Box1b from "../Components/Box1b";
import Box2 from "../Components/Box2";
import '../Css/Bonds.css';
import Header from "../Components/Header";


const Bonds = () => {

  return (

  <div>
    
    <div className="bondholders">
      <h3 className="bh">Bond Holders</h3>
      <div className="box1y2">
        <Box1a />
        <Box1b />
      </div>
    </div>
    <div className="bliquidity">
      <h3 className="bl">Bond Liquidity</h3>
      <Box2 />
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
        </div>
      </div>

    </div>

  </div>
  );
};

export default Bonds;


