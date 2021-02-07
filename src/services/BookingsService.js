import axios from 'axios';

const PAYMENT_SERVER_URL = 'https://bookbnb-payment.herokuapp.com';
const API_KEY = 'apikeydetestingenprod';

const getBookings = async (roomId = null) => {
  let path = `${PAYMENT_SERVER_URL}/bookings`;

  if (roomId) path += `?roomId=${roomId}`;

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

export { getBookings, getBooking };
