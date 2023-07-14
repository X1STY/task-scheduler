import instance from '../api/instance';

export const getUserEvents = async (startDate, endDate) => {
  return await instance.get(`/events?start_date=${startDate}&end_date=${endDate}`);
};

export const addNewEvent = async (newEvent) => {
  return await instance.post('/event', newEvent);
};

export const addNewEventWithReply = async (newEvent) => {
  return await instance.post('/event-group', newEvent);
};

export const deleteEventById = async (id) => {
  return await instance.delete(`/event/${id}`);
};

export const changeEventById = async (body) => {
  return await instance.patch(`/event/${body.id}`, body.updatedEvent);
};
