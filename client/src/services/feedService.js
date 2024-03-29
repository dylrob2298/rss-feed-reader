import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Adjust according to your setup

export const getFeeds = async () => {
  const response = await axios.get(`${API_BASE_URL}/feeds`);
  return response.data;
};

export const addFeed = async (feed) => {
  const response = await axios.post(`${API_BASE_URL}/feeds`, feed);
  return response.data;
};
