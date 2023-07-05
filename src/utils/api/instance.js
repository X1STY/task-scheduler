import axios from "axios";

const instance = axios.create({
    baseURL: 'https://64a4f83300c3559aa9beddb2.mockapi.io/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export default instance