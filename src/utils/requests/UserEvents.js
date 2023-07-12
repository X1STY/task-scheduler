import instance, { headers } from '../api/instance';

export const getUserEvents = async () => {
  //instance.get(`/events/?start_date=${startDate}&end_date=${endDate}`)...
  return await instance.get('/events', {
    headers: {
      access_token: `${headers.token}`
    }
  });
};

export const addNewEvent = async (newEvent) => {
  return await instance.post('/events', newEvent, {
    headers: {
      access_token: `${headers.token}`
    }
  });
};
