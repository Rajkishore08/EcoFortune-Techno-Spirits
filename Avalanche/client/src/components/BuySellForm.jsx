import React, { useState } from 'react';
import { buyCrypto, sellCrypto } from '../services/transactionService'; // Assuming you create this

const BuySellForm = () => {
  const [symbol, setSymbol] = useState('');
  const [amount, setAmount] = useState('');
  const userId = 'someUserId'; // Replace with actual user ID

  const handleBuy = async () => {
    await buyCrypto(userId, symbol, amount);
    alert('Buy order placed (simulated)');
  };

  const handleSell = async () => {
    await sellCrypto(userId, symbol, amount);
    alert('Sell order placed (simulated)');
  };

  return (
    <div>
      <h2>Buy/Sell Crypto</h2>
      <input
        type="text"
        placeholder="Symbol (e.g., BTC)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleBuy}>Buy</button>
      <button onClick={handleSell}>Sell</button>
    </div>
  );
};

export default BuySellForm;