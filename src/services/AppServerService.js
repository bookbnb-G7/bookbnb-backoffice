import axios from 'axios';

const APP_SERVER_URL = process.env.REACT_APP_APP_SERVER_URL;

const status = async () => {
  let path = `${APP_SERVER_URL}/ping`;

  try {
    const response = await axios.get(path);
    return response.status;
  } catch {
    return 500;
  }
};

export { status };
