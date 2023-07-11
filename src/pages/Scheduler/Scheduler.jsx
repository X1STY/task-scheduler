import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Sidebar from '../../components/sideBar/SideBar';
import useForm from '../../utils/hooks/useForm';
import { addNewEvent, getUserEvents } from '../../utils/requests/UserEvents';

import '../../assets/Auth.css';

export const Scheduler = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const queryClient = useQueryClient();
  const mutation = useMutation(addNewEvent);
  const { values, handleChange, resetForm, handleSubmit } = useForm(
    { time: '', description: '' },
    async (values) => {
      const formattedDate = new Date(chosenDate).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const newEvent = {
        date: formattedDate,
        time: values.time,
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

  const { data, isLoading } = useQuery(['events'], getUserEvents, {
    refetchOnWindowFocus: false
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <Stack direction='row' sx={{ ml: 110 }}>
        <Stack direction='column' sx={{ minWidth: 900, mt: 45 }}>
          {data &&
            data.data.map((event, id) => (
              <div key={id}>
                <Typography variant='body1'>Date: {event.date}</Typography>
                <Typography variant='body1'>Time: {event.time}</Typography>
                <Typography variant='body1'>Description: {event.description}</Typography>
                <br />
              </div>
            ))}
        </Stack>
        <form
          className='form'
          onSubmit={handleSubmit}
          style={{ position: 'fixed', marginLeft: 250 }}
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
