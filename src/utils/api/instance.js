import axios from 'axios';
const token = localStorage.getItem('accessToken');

const instance = axios.create({
  baseURL: 'https://64a4f83300c3559aa9beddb2.mockapi.io/api/'
  // baseURL: 'http://81.177.197.88:8080/api/'
});

export const headers = {
  'Content-Type': 'application/json',
  token: `${token}`
};

export default instance;
