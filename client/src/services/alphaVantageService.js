import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY; // Store in .env.local

export const fetchRealTimePrice = async (symbol) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    return response.data['Global Quote'];
  } catch (error) {
    console.error('Error fetching real-time price:', error);
    return null;
  }
};