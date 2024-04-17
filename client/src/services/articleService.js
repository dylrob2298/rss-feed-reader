import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data;
};

export const getArticlesForFeed = async (feedId) => {
  const response = await axios.get(`${API_BASE_URL}/articles/${feedId}`);
  return response.data;
};

export const getArticleSummary = async (articleUrl) => {
  const response = await axios.post(`${API_BASE_URL}/articles/summary`, { articleUrl });
  return response.data;
}