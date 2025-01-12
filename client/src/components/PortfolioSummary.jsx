import React from 'react';

const PortfolioSummary = ({ portfolio }) => {
  return (
    <div>
      <h2>Portfolio Summary</h2>
      {portfolio.holdings.map(holding => (
        <div key={holding.crypto}>
          {holding.crypto}: {holding.quantity}
        </div>
      ))}
    </div>
  );
};

export default PortfolioSummary;