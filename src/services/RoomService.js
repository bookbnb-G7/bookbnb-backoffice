import axios from 'axios';

const POST_SERVER_URL = process.env.REACT_APP_POST_SERVER_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const getRooms = async (allowBlocks = true) => {
  let path = `${POST_SERVER_URL}/rooms`;

  if (allowBlocks) path += '?allow_blocked=true';

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

const blockRoom = async (roomId) => {
  let path = `${POST_SERVER_URL}/rooms/${roomId}`;

  const response = await axios.patch(
    path,
    {
      blocked: true,
    },
    { headers: { 'api-key': API_KEY } },
  );
  return response.data;
};

const unblockRoom = async (roomId) => {
  let path = `${POST_SERVER_URL}/rooms/${roomId}`;

  const response = await axios.patch(
    path,
    {
      blocked: false,
    },
    { headers: { 'api-key': API_KEY } },
  );
  return response.data;
};

const status = async () => {
  let path = `${POST_SERVER_URL}/ping`;

  const response = await axios.get(path);

  return response.status;
};

export { getRooms, getRoom, getRoomReviews, getRoomRatings, blockRoom, unblockRoom, status };
