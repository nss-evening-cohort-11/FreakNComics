import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllProductTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/producttype`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
export default getAllProductTypes;
