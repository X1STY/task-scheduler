import instance from '../api/instance';

export const getUserSections = async () => {
  return await instance.get('/sections', {
    headers: {
      access_token: `${localStorage.getItem('token')}`
    }
  });
};

export const getEventsInSection = async (id) => {
  return await instance.get(`/section/${id}`, {
    headers: {
      access_token: `${localStorage.getItem('token')}`
    }
  });
};
