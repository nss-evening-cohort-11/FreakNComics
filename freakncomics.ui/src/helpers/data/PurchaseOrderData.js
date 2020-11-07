import axios from 'axios';
import { baseUrl } from './constants.json';

// const checkForActiveOrdersByUserId = (userId) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/orders/active-orders/${userId}`)
//     .then((resp) => resolve(resp))
//     .catch((err) => reject(err));
// });

const checkForActiveOrdersByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders/active-orders/${userId}`)
    .then((resp) => {
      const activeOrder = resp.status === 200 ? 'Active Order Exists' : 'No Active Order Exists';
      resolve(activeOrder);
    })
    .catch((err) => reject(err));
});

export default {checkForActiveOrdersByUserId}; // eslint-disable-line