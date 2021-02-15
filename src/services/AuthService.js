import axios from 'axios';

const AUTH_SERVER_URL = 'https://bookbnb-authserver.herokuapp.com';
const API_KEY = 'apikeydetestingenprod';

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

export { getUserAuthInfo, blockUser, unblockUser, status, isAdmin };
