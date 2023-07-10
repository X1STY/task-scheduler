import instance from '../api/instance';

export const getUserEvents = async () => {
  //instance.get(`/events/?start_date=${startDate}&end_date=${endDate}`)...
  return await instance.get('/events');
};

export const addNewEvent = async (newEvent) => {
  return await instance.post('/events', newEvent);
};
