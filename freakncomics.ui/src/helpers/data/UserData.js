import axios from 'axios';
import { baseUrl } from './constants.json';

const getUserByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUserByUserId };
