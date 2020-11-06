import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { baseUrl } from './constants.json';

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/products`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/products/${productId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const getProductByUserInput = (userInput) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/products/search/${userInput}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getLatestProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/products/latestproducts`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export default {getAllProducts, getSingleProduct, getProductByUserInput, getLatestProducts}; // eslint-disable-line
