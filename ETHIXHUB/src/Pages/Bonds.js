import CombinedChart from "../Components/CombinedChart";
import CombinedChart2 from "../Components/CombinedChart2";
import Chart5 from "../Components/Chart5";

import '../Css/Bonds.css';
import Header from "../Components/Header";


const Bonds = () => {

  return (
    <div>
    <div className="container">
      <div className="bonds-minted">
        <h3>Amount of bonds minted by month</h3>
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


/*const Bonds = () => {
  const [chartComponent, setChartComponent] = useState("combinedChart2");

  const handleChartComponentChange = (event) => {
    const selectedChart = event.target.value;
    setChartComponent(selectedChart);
  };

  return (
    <div>
      <Chart3 />
      <Chart4 />
      <CombinedChart />
      <label>
        ETH-CELO
        <input
          type="radio"
          value="combinedChart2"
          checked={chartComponent === "combinedChart2"}
          onChange={handleChartComponentChange}
        />
      </label>
      <label>
        ETH
        <input
          type="radio"
          value="chart1"
          checked={chartComponent === "chart1"}
          onChange={handleChartComponentChange}
        />
      </label>
      <label>
        CELO
        <input
          type="radio"
          value="chart2"
          checked={chartComponent === "chart2"}
          onChange={handleChartComponentChange}
        />
      </label>
      {chartComponent === "combinedChart2" && <CombinedChart2 />}
      {chartComponent === "chart1" && <Chart1 />}
      {chartComponent === "chart2" && <Chart2 />}
      
    </div>
  );
};

export default Bonds;*/


