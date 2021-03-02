import axios from 'axios';

const APP_SERVER_URL = process.env.APP_SERVER_URL;

const status = async () => {
  let path = `${APP_SERVER_URL}/ping`;

  const response = await axios.get(path);

  return response.status;
};

export { status };
