import axios from 'axios';

const API_BASE_URL = '/api/green-portfolio/transactions'; // Adjust if needed

export const buyCrypto = async (userId, symbol, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/buy`, { userId, symbol, amount });
    return response.data;
  } catch (error) {
    console.error('Error buying crypto:', error);
    throw error;
  }
};

export const sellCrypto = async (userId, symbol, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sell`, { userId, symbol, amount });
    return response.data;
  } catch (error) {
    console.error('Error selling crypto:', error);
    throw error;
  }
};