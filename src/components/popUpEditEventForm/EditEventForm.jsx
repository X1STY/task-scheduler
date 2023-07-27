import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Button, Checkbox, FormControl, FormControlLabel, Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changeEventById, changeEventGroup } from '../../utils/requests/UserEvents';
import {
  formatDateToStandart,
  newDateToStringFormatWithDefis
} from '../schedulerDisplay/groupEventsByDates';

export const EditEventForm = (props) => {
  const { value, setOpenForm } = props;
  const [date, setDate] = useState(formatDateToStandart(value.date));
  const [time, setTime] = useState(value.event.time);
  const [description, setDescription] = useState(value.event.description);
  const [is_replayed] = useState(value.event.is_replayed);
  const [id] = useState(value.event.id);
  const [event_group_id] = useState(value.event.event_group_id);
  const [checked, setChecked] = useState(false);
  const changeEventMutation = useMutation(changeEventById);
  const changeEventGroupMutation = useMutation(changeEventGroup);
  const queryClient = useQueryClient();

  const editEventGroup = async (updatedEvent) => {
    await changeEventGroupMutation.mutate(
      { event_group_id, updatedEvent },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['events']);
        }
      }
    );
  };

  const editEvent = async (updatedEvent) => {
    await changeEventMutation.mutate(
      { id, updatedEvent },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['events']);
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedEvent;
    if (checked) {
      updatedEvent = {
        time: time,
        description: description
      };
      editEventGroup(updatedEvent);
    } else {
      updatedEvent = {
        date: newDateToStringFormatWithDefis(new Date(date)),
        time: time,
        description: description
      };
      editEvent(updatedEvent);
    }
  };
  const handleChangeCheckBox = (e) => {
    setChecked(e.target.checked);
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
          {is_replayed && (
            <FormControl sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FormControlLabel
                label='Change for event group'
                value='end'
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckBox}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
              />
            </FormControl>
          )}

          <Stack
            direction='row'
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 10 }}
          >
            <Button
              variant='contained'
              color='primary'
              type='submit'
              onClick={() => {
                setOpenForm(false);
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
