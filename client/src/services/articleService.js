import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Adjust according to your setup

export const getArticles = async (feedId) => {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data;
};
