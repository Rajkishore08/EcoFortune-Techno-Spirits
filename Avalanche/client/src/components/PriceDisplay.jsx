import React from 'react';

const PriceDisplay = ({ symbol, price }) => {
  return (
    <div>
      {symbol}: ${price ? price.toFixed(2) : 'Loading...'}
    </div>
  );
};

export default PriceDisplay;