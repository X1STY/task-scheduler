import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteEventById, deleteEventGroup } from '../../utils/requests/UserEvents';

import { newDateToStringFormatWithDefis } from './groupEventsByDates';

const useScheduler = () => {
  const [startDate, setStartDate] = useState(
    newDateToStringFormatWithDefis(new Date('2023-07-01'))
  );
  const [endDate, setEndDate] = useState(newDateToStringFormatWithDefis(new Date('2023-08-31')));
  const deleteEventMutation = useMutation(deleteEventById);
  const deleteEventGroupMutation = useMutation(deleteEventGroup);
  const queryClient = useQueryClient();
  const [popUpData, setPopUpData] = useState();
  const handleDeleteEvent = async (id) => {
    try {
      deleteEventMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(['events']);
        }
      });
    } catch (error) {
      return error;
    }
  };

  const handleDeleteEventGroup = async (id) => {
    try {
      deleteEventGroupMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(['events']);
        }
      });
    } catch (error) {
      return error;
    }
  };

  const handleEditEvent = (date, event) => {
    setPopUpData({ date: date, event: event });
  };

  const setDates = (values) => {
    setStartDate(values[0].format());
    setEndDate(values[1].format());
  };
  return {
    startDate,
    endDate,
    setDates,
    handleDeleteEvent,
    handleDeleteEventGroup,
    handleEditEvent,
    popUpData
  };
};

export default useScheduler;
