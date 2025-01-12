import axios from 'axios';

const API_BASE_URL = '/api/green-portfolio/portfolio'; // Adjust if needed

export const getUserPortfolio = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    throw error;
  }
};