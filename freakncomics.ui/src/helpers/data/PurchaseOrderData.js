import axios from 'axios';
import { baseUrl } from './constants.json';

const checkForActiveOrdersByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders/active-orders/${userId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {checkForActiveOrdersByUserId}; // eslint-disable-line