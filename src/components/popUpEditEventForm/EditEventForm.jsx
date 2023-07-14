import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Button, Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changeEventById } from '../../utils/requests/UserEvents';
import {
  formatDateToStandart,
  newDateToStringFormatWithDefis
} from '../schedulerDisplay/groupEventsByDates';

export const EditEventForm = (props) => {
  const { value } = props;
  const [date, setDate] = useState(formatDateToStandart(value.date));
  const [time, setTime] = useState(value.event.time);
  const [description, setDescription] = useState(value.event.description);
  const [id] = useState(value.event.id);
  const changeEventMutation = useMutation(changeEventById);
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      date: newDateToStringFormatWithDefis(new Date(date)),
      time: time,
      description: description
    };

    changeEventMutation.mutate(
      { id, updatedEvent },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['events']);
        }
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack sx={{ minWidth: 400, minHeight: 400 }}>
          <DatePicker value={date} onChange={setDate} format='DD.MM.YYYY' />
          <TextField
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            sx={{ mt: 20, mb: 20 }}
          />
          <TextField
            label='Description'
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Stack direction='row'>
            <Button variant='contained' color='primary' type='submit' sx={{ mt: 20, ml: 10 }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
