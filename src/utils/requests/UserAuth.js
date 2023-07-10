import instance from '../api/instance';

export const registerUser = async (userData) => {
  return await instance.post('/user', userData);
};

export const AuthorizateUser = async (userData) => {
  return await instance.post('/auth', userData);
};
