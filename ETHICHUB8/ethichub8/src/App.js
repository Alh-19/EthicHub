import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataContextProvider, DataContext } from './Data/DataContextProvider';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import BondsPage from './Pages/Bonds';
import EthixPage from './Pages/Ethix';
import StakePage from './Pages/Stake';

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
  
        <Routes>
          <Route exact path="/bonds" component={BondsPage} />
          <Route exact path="/ethix" component={EthixPage} />
          <Route exact path="/stake" component={StakePage} />
        </Routes>
  );
};

export default App;

