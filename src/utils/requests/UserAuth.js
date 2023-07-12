import instance from '../api/instance';

export const registerUser = async (userData) => {
  return await instance.post('/user', userData);
};

export const authorizateUser = async (userData) => {
  return await instance.post('/login', userData);
};
