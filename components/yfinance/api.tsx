import axios from 'axios';

const API_URL = 'http://localhost:8000/finance/stock/';

export const getStockData = async (stockSymbol: string) => {
  try {
    const response = await axios.get(`${API_URL}${stockSymbol}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};