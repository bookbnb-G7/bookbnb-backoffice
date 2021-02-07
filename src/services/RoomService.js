import axios from 'axios';

const POST_SERVER_URL = 'https://bookbnb-postserver.herokuapp.com';
const API_KEY = 'apikeydetestingenprod';

const getRooms = async () => {
  let path = `${POST_SERVER_URL}/rooms`;

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const getRoom = async (roomId) => {
  let path = `${POST_SERVER_URL}/rooms/${roomId}`;

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const getRoomReviews = async (roomId) => {
  let path = `${POST_SERVER_URL}/rooms/${roomId}/reviews`;

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const getRoomRatings = async (roomId) => {
  let path = `${POST_SERVER_URL}/rooms/${roomId}/ratings`;

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

export { getRooms, getRoom, getRoomReviews, getRoomRatings };
