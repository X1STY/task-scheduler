import axios from 'axios';
const accessToken = localStorage.getItem('accessToken');

const instance = axios.create({
  // baseURL: 'https://64a4f83300c3559aa9beddb2.mockapi.io/api/'
  baseURL: 'http://81.177.197.88:8080/api/'
});

instance.defaults.headers.common['Authorization'] = accessToken;
instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
