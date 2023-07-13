import instance, { headers } from '../api/instance';

export const getUserEvents = async (startDate, endDate) => {
  //instance.get(`/events/?start_date=${startDate}&end_date=${endDate}`)...
  return await instance.get(`/events?start_date=${startDate}&end_date=${endDate}`, {
    headers: {
      'access-token': `${localStorage.getItem('token')}`
    }
  });
};

export const addNewEvent = async (newEvent) => {
  return await instance.post('/events', newEvent, {
    headers: {
      'access-token': `${headers.token}`
    }
  });
};

export const deleteEventById = async (id) => {
  return await instance.delete(`/event/${id}`, {
    headers: {
      'access-token': `${headers.token}`
    }
  });
};

export const changeEventById = async (id, changedEvent) => {
  return await instance.patch(`/event/${id}`, changedEvent, {
    headers: {
      'access-token': `${headers.token}`
    }
  });
};
