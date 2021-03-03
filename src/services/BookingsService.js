import axios from 'axios';

const PAYMENT_SERVER_URL = process.env.REACT_APP_PAYMENT_SERVER_URL;
const API_KEY = 'apikeydetestingenprod';

const getBookings = async (queryParams) => {
  let path = `${PAYMENT_SERVER_URL}/bookings`;

  if (queryParams) {
    path += '?';

    if (queryParams.roomId) path += `roomId=${queryParams.roomId}&`;
    if (queryParams.bookerId) path += `bookerId=${queryParams.bookerId}&`;
    if (queryParams.roomOwnerId) path += `roomOwnerId=${queryParams.roomOwnerId}&`;
  }

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const getBooking = async (bookingId) => {
  let path = `${PAYMENT_SERVER_URL}/bookings/${bookingId}`;

  const response = await axios.get(path, {
    headers: { 'api-key': API_KEY },
  });
  return response.data;
};

const status = async () => {
  let path = `${PAYMENT_SERVER_URL}/ping`;

  const response = await axios.get(path);

  return response.status;
};

export { getBookings, getBooking, status };
