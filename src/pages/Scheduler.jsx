import { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import instance from '../utils/api/instance';

import '../assets/Auth.css';

export const Scheduler = () => {
  const [events, setEvents] = useState([]);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [desc, setDesc] = useState('');

  const mutation = useMutation(addEvent);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    //for our server
    //instance.get(`/events/?start_date=${startDate}&end_date=${endDate}`)...
    try {
      const response = await instance.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function addEvent(newEvent) {
    console.log(newEvent);
    setEvents(() => [...events, newEvent]);
    return await instance.post('/events', newEvent);
  }

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(chosenDate).toISOString().split('T')[0];

      const newEvent = { date: formattedDate, time, description: desc };

      mutation.mutateAsync(newEvent);
      setChosenDate(new Date());
      setTime('');
      setDesc('');
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      <Stack direction='row'>
        <Stack direction='column' sx={{ minWidth: 900 }}>
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
        <form className='form' onSubmit={handleAddEvent}>
          <Typography variant='body1'>Choose date(s):</Typography>
          <DatePicker
            multiple={false}
            value={chosenDate}
            onChange={setChosenDate}
            format='DD.MM.YYYY'
          />
          <Typography variant='body1'>Choose time:</Typography>
          <input
            placeholder='Time'
            type='time'
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Typography variant='body1'>Event description</Typography>
          <TextField
            variant='outlined'
            label='description'
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button variant='contained' type='submit' sx={{ bgcolor: 'general.purple' }}>
            Add event
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default Scheduler;
