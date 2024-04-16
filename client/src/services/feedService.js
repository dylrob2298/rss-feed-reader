import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getFeeds = async () => {
  const response = await axios.get(`${API_BASE_URL}/feeds`);
  return response.data;
};

export const addFeed = async (feed) => {
  const response = await axios.post(`${API_BASE_URL}/feeds`, feed);
  return response.data;
};

export const updateFeed = async (feedUrl) => {
  console.log('selected feed: ', feedUrl);
  const response = await axios.post(`${API_BASE_URL}/feeds/update-articles`, { feedUrl })
  return response.data;
}

export const updateAllFeeds = async () => {
  const response = await axios.post(`${API_BASE_URL}/feeds/update-all`)
  return response.data;
}
