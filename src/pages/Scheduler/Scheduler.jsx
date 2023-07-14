import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { newDateToStringFormatWithDefis } from '../../components/schedulerDisplay/groupEventsByDates';
import SchedulerDisplay from '../../components/schedulerDisplay/SchedulerDisplay';
import Sidebar from '../../components/sideBar/SideBar';
import useForm from '../../utils/hooks/useForm';
import { addNewEvent, addNewEventWithReply } from '../../utils/requests/UserEvents';

import '../../assets/Auth.css';

export const Scheduler = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [repetition, setRepetition] = useState('one-time');
  const [endDate, setEndDate] = useState(null);

  const queryClient = useQueryClient();
  const addOnceTimeEventMutation = useMutation(addNewEvent);
  const addReplyedTimeEventMutation = useMutation(addNewEventWithReply);

  const { values, handleChange, resetForm, handleSubmit } = useForm(
      { time: '', description: '' },
      async (values) => {
        const formattedDate = newDateToStringFormatWithDefis(new Date(chosenDate));
        let newEvent;
        if (repetition === 'one-time') {
          newEvent = {
            date: formattedDate,
            time: values.time + ':00',
            description: values.description
          };
        } else {
          newEvent = {
            date: formattedDate,
            time: values.time + ':00',
            description: values.description,
            replay: {
              dates: null,
              replay_type: repetition,
              start_date: formattedDate,
              end_date: newDateToStringFormatWithDefis(new Date(endDate))
            },
            section_id: null
          };
        }

        console.log(newEvent);
        try {
          if (repetition === 'one-time') {
            addOnceTimeEventMutation.mutate(newEvent, {
              onSuccess: () => {
                queryClient.invalidateQueries(['events']);
                resetForm();
                setChosenDate(new Date());
              }
            });
          } else {
            addReplyedTimeEventMutation.mutate(newEvent, {
              onSuccess: () => {
                queryClient.invalidateQueries(['events']);
                resetForm();
                setChosenDate(new Date());
              }
            });
          }
          addOnceTimeEventMutation.mutate(newEvent, {
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

  const handleRepetitionChange = (event) => {
    setRepetition(event.target.value);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

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
            <Typography variant='body1'>Repeatability</Typography>
            <Select
                label='arbitrary'
                //onChange={handleChange}
                value={repetition}
                onChange={handleRepetitionChange}
            >
              <MenuItem value='one-time'>One-time</MenuItem>
              <MenuItem value='DAILY'>Daily</MenuItem>
              <MenuItem value='WEEKLY'>Weekly</MenuItem>
              <MenuItem value='MONTHLY'>Monthly</MenuItem>
              <MenuItem value='YEARLY'>Yearly</MenuItem>
            </Select>
            <Typography variant='body1'>Repeatability</Typography>
            {repetition !== 'one-time' && (
                <>
                  <Typography variant='body1'>End date:</Typography>
                  <DatePicker
                      multiple={false}
                      value={endDate}
                      name='endDate'
                      onChange={handleEndDateChange}
                      format='DD.MM.YYYY'
                  />
                </>
            )}
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