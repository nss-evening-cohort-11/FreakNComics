import axios from 'axios';
import { baseUrl } from './constants.json';

const createLineItem = () => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/orders/{id}`)
});