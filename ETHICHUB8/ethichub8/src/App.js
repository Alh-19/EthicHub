import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataContext } from './Data/DataContextProvider';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import Ethix from './Pages/Ethix.js';
import Stake from './Pages/Stake.js'
import Bonds from './Pages/Bonds.js';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 20px;
`;
const App = () => {
  const { loading } = useContext(DataContext);
  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#123abc" loading={true} css={override} size={50} />
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route exact path="/bonds" element={<Bonds />} />
        <Route exact path="/ethix" element={<Ethix />} />
        <Route exact path="/stake" element={<Stake />} />
      </Routes>
    </Router>
  );
};
export default App;

