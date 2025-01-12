import React, { useState, useEffect } from 'react';
import PriceDisplay from '../components/PriceDisplay';
import BuySellForm from '../components/BuySellForm';
import PortfolioSummary from '../components/PortfolioSummary';
import { fetchRealTimePrice } from '../services/alphaVantageService';
import { getUserPortfolio } from '../services/portfolioService'; // Assuming you create this

const Dashboard = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [userPortfolio, setUserPortfolio] = useState(null);
  const userId = 'someUserId'; // Replace with actual user ID

  useEffect(() => {
    const loadPrices = async () => {
      const btcData = await fetchRealTimePrice('BTC');
      if (btcData && btcData['05. price']) {
        setBtcPrice(parseFloat(btcData['05. price']));
      }
      const ethData = await fetchRealTimePrice('ETH');
      if (ethData && ethData['05. price']) {
        setEthPrice(parseFloat(ethData['05. price']));
      }
    };

    const loadPortfolio = async () => {
      const portfolioData = await getUserPortfolio(userId);
      setUserPortfolio(portfolioData);
    };

    loadPrices();
    loadPortfolio();
  }, [userId]);

  return (
    <div>
      <h1>Green Portfolio Dashboard</h1>
      <PriceDisplay symbol="BTC" price={btcPrice} />
      <PriceDisplay symbol="ETH" price={ethPrice} />

      <BuySellForm />

      {userPortfolio && <PortfolioSummary portfolio={userPortfolio} />}
    </div>
  );
};

export default Dashboard;