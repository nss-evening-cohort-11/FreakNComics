import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from './constants.json';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, (err) => Promise.reject(err));

const registerUser = (user) => firebase.auth().signInWithPopup(user.email).then((cred) => {
  const userInfo = { email: cred.user.email };
  cred.user.getIdToken()
    .then((token) => sessionStorage.setItem('token', token))
    .then(() => axios.post(`${baseUrl}/users`, userInfo));
});

export default { registerUser };
