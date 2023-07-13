import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { newDateToStringFormat } from '../../components/schedulerDisplay/groupEventsByDates';
import SchedulerDisplay from '../../components/schedulerDisplay/SchedulerDisplay';
import Sidebar from '../../components/sideBar/SideBar';
import useForm from '../../utils/hooks/useForm';
import { addNewEvent } from '../../utils/requests/UserEvents';

import '../../assets/Auth.css';

export const Scheduler = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const queryClient = useQueryClient();
  const mutation = useMutation(addNewEvent);
  const { values, handleChange, resetForm, handleSubmit } = useForm(
    { time: '', description: '' },
    async (values) => {
      const formattedDate = newDateToStringFormat(new Date(chosenDate));
      const newEvent = {
        date: formattedDate,
        time: values.time + ':00',
        description: values.description
      };
      try {
        mutation.mutate(newEvent, {
          onSuccess: () => {
            queryClient.invalidateQueries(['events']);
            resetForm();
            setChosenDate(new Date());
          }
        });
      } catch (error) {
        return error;
      }
    }
  );

  return (
    <>
      <Stack direction='row'>
        <Sidebar />
        <Box>
          <SchedulerDisplay />
        </Box>
        <form
          className='form'
          onSubmit={handleSubmit}
          style={{ height: '100vh', width: '30vw', position: 'fixed', marginLeft: '65vw' }}
        >
          <Typography variant='body1'>Choose date(s):</Typography>
          <DatePicker
            multiple={false}
            value={chosenDate}
            name='chosenDate'
            onChange={setChosenDate}
            format='DD.MM.YYYY'
          />
          <Typography variant='body1'>Choose time:</Typography>
          <input
            placeholder='Time'
            type='time'
            name='time'
            required
            value={values.time}
            onChange={handleChange}
          />
          <Typography variant='body1'>Event description</Typography>
          <TextField
            variant='outlined'
            label='description'
            name='description'
            required
            value={values.description}
            onChange={handleChange}
          />
          <Button
            variant='contained'
            type='submit'
            sx={{ bgcolor: 'general.lightGreen', ':hover': { bgcolor: 'general.hoverGreen' } }}
          >
            Add event
          </Button>
        </form>
      </Stack>
    </>
  );
};
export default Scheduler;
