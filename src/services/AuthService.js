import axios from 'axios';
import { ServerBlockedStatus } from '../constants';

const API_HEROKU_SECRET = `Bearer ${process.env.REACT_APP_API_HEROKU_SECRET}`;
const DISABLED_API_KEY = process.env.REACT_APP_DISABLED_API_KEY;
const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const getUserAuthInfo = async (userId) => {
  let path = `${AUTH_SERVER_URL}/users/${userId}`;

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });

  return response.data;
};

const blockUser = async (userId) => {
  let path = `${AUTH_SERVER_URL}/users/${userId}/block`;

  const response = await axios.post(path, {}, { headers: { 'api-key': API_KEY } });

  return response.data;
};

const unblockUser = async (userId) => {
  let path = `${AUTH_SERVER_URL}/users/${userId}/unblock`;

  const response = await axios.post(path, {}, { headers: { 'api-key': API_KEY } });

  return response.data;
};

const status = async () => {
  let path = `${AUTH_SERVER_URL}/ping`;

  const response = await axios.get(path);

  return response.status;
};

const isAdmin = async (token) => {
  let path = `${AUTH_SERVER_URL}/admins/sign-in`;

  const response = await axios.get(path, {
    headers: { 'x-access-token': token },
  });

  return response.status == 200;
};

const blockedStatus = async (serverName) => {
  let path = `https://api.heroku.com/apps/${serverName}/config-vars`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.heroku+json; version=3',
      Authorization: API_HEROKU_SECRET,
    },
  };

  console.log(API_HEROKU_SECRET);

  const response = await axios.get(path, config);

  if (response.data.API_KEY === DISABLED_API_KEY) {
    return ServerBlockedStatus.BLOCKED;
  } else {
    return ServerBlockedStatus.UNBLOCKED;
  }
};

const blockServer = async (serverName) => {
  let path = `https://api.heroku.com/apps/${serverName}/config-vars`;

  const body = { API_KEY: process.env.REACT_APP_DISABLED_API_KEY };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.heroku+json; version=3',
      Authorization: API_HEROKU_SECRET,
    },
  };

  const response = await axios.patch(path, body, config);

  return response.status == 200;
};

const unblockServer = async (serverName) => {
  let path = `https://api.heroku.com/apps/${serverName}/config-vars`;

  const body = { API_KEY: API_KEY };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.heroku+json; version=3',
      Authorization: API_HEROKU_SECRET,
    },
  };

  const response = await axios.patch(path, body, config);

  return response.status == 200;
};

export { getUserAuthInfo, blockUser, unblockUser, status, isAdmin, blockServer, unblockServer, blockedStatus };
