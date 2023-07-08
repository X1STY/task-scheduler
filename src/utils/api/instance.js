import axios from 'axios';
const accessToken = localStorage.getItem('accessToken');

const instance = axios.create({
  baseURL: 'https://64a4f83300c3559aa9beddb2.mockapi.io/api/'
});

instance.defaults.headers.common['Authorization'] = accessToken;

export default instance;
