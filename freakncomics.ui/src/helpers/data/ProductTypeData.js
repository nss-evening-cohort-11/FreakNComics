import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllProductTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/producttype`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllProductTypes };
