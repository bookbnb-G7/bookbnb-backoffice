import axios from 'axios';

const APP_SERVER_URL = 'https://bookbnb-authserver.herokuapp.com';

const status = async () => {
  let path = `${APP_SERVER_URL}/ping`;

  const response = await axios.get(path);

  return response.status;
};

export { status };
