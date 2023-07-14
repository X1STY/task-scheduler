import instance from '../api/instance';

export const getUserEvents = async (startDate, endDate) => {
  return await instance.get(`/events?start_date=${startDate}&end_date=${endDate}`, {
    headers: {
      'access-token': `${localStorage.getItem('token')}`
    }
  });
};

export const addNewEvent = async (newEvent) => {
  return await instance.post('/event', newEvent, {
    headers: {
      'access-token': `${localStorage.getItem('token')}`
    }
  });
};

export const addNewEventWithReply = async (newEvent) => {
  return await instance.post('/event-group', newEvent, {
    headers: {
      'access-token': `${localStorage.getItem('token')}`
    }
  });
};

export const deleteEventById = async (id) => {
  return await instance.delete(`/event/${id}`, {
    headers: {
      'access-token': `${localStorage.getItem('token')}`
    }
  });
};

export const changeEventById = async (body) => {
  return await instance.patch(`/event/${body.id}`, body.updatedEvent, {
    headers: {
      'access-token': `${localStorage.getItem('token')}`
    }
  });
};
