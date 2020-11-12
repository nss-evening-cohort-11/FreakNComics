import axios from 'axios';
import { baseUrl } from './constants.json';

const addToCart = (userId, product) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/orders/cart/${userId}`, product)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {addToCart}; // eslint-disable-line