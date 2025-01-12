const axios = require('axios');
const config = require('../config');

exports.getRealTimePrice = async (req, res) => {
  const { symbol } = req.params;
  const apiKey = config.alphaVantageApiKey;
  const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data && response.data['Global Quote']) {
      res.json(response.data['Global Quote']);
    } else {
      res.status(404).json({ message: 'Symbol not found or API error.' });
    }
  } catch (error) {
    console.error('Error fetching real-time price:', error);
    res.status(500).json({ message: 'Failed to fetch real-time price.' });
  }
};