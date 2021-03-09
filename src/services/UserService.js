import axios from 'axios';
import { Ratings, Reviews } from '../constants';

const USER_SERVER_URL = process.env.REACT_APP_USER_SERVER_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const getUsers = async () => {
  let path = `${USER_SERVER_URL}/users`;

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const getUser = async (userId) => {
  let path = `${USER_SERVER_URL}/users/${userId}`;

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const getReceviedRatings = async (userId, ratingType) => {
  let path = `${USER_SERVER_URL}/users/${userId}/`;

  if (ratingType === Ratings.GUEST) path += 'guest_ratings';
  if (ratingType === Ratings.HOST) path += 'host_ratings';

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const getRecievedReviews = async (userId, ratingType) => {
  let path = `${USER_SERVER_URL}/users/${userId}/`;

  if (ratingType === Reviews.GUEST) path += 'guest_reviews';
  if (ratingType === Reviews.HOST) path += 'host_reviews';

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const status = async () => {
  let path = `${USER_SERVER_URL}/ping`;
  try {
    const response = await axios.get(path);
    return response.status;
  } catch {
    return 500;
  }
};

export { getUsers, getUser, getReceviedRatings, getRecievedReviews, status };
