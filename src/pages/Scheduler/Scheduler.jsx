import { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import Sidebar from '../../components/sideBar/SideBar';
import useForm from '../../utils/hooks/useForm';
import { addNewEvent, getUserEvents } from '../../utils/requests/UserEvents';

import '../../assets/Auth.css';

export const Scheduler = () => {
  const [events, setEvents] = useState([]);

  const { values, handleChange, resetForm, handleSubmit } = useForm(
    { time: '', description: '' },
    async (values) => {
      const formattedDate = new Date(chosenDate).toISOString().split('T')[0];
      const newEvent = {
        date: formattedDate,
        time: values.time,
        description: values.description
      };
      try {
        mutation.mutate(newEvent, {
          onSuccess: () => {
            setEvents(() => [...events, newEvent]);
            resetForm();
            setChosenDate(new Date());
          }
        });
      } catch (error) {
        return error;
      }
    }
  );
  const [chosenDate, setChosenDate] = useState(new Date());

  const mutation = useMutation(addNewEvent);

  useEffect(() => {
    try {
      getUserEvents().then((response) => {
        setEvents(response.data);
      });
    } catch (error) {
      return error;
    }
  }, []);

  return (
    <>
      <Sidebar />
      <Stack direction='row' sx={{ ml: 110 }}>
        <Stack direction='column' sx={{ minWidth: 900, mt: 45 }}>
          {events &&
            events.map((event, id) => (
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
