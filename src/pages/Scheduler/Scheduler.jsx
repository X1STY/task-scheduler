import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import Icon from 'react-multi-date-picker/components/icon';
import { Box, Button, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Icon from 'react-multi-date-picker/components/icon';

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

        <Grid
          container
          direction='column'
          justifyContent='center'
          style={{ marginLeft: '65vw', marginTop: '10vh', position: 'fixed' }}
        >
          <Grid item xs={6}>
            <Stack direction='row' sx={{ display: 'flex', textAlign: 'top', alignItems: 'top' }}>
              <Typography
                variant='h5'
                sx={{ textAlign: 'center', marginRight: '2vw', marginBottom: '4vh' }}
              >
                Выберите дату начала:
              </Typography>
              <DatePicker
                multiple={false}
                value={chosenDate}
                name='chosenDate'
                onChange={setChosenDate}
                format='DD.MM.YYYY'
                render={<Icon />}
              />
            </Stack>
            <Stack direction='row'>
              <Typography variant='h5' style={{ marginRight: '2vw', marginBottom: '4vh' }}>
                Выберите время:
              </Typography>
              <input
                style={{ maxHeight: '3vh' }}
                placeholder='Time'
                type='time'
                name='time'
                required
                value={values.time}
                onChange={handleChange}
              />
            </Stack>
            <Typography variant='h5' style={{ marginRight: '2vw', marginBottom: '2vh' }}>
              Введите описание ивента:
            </Typography>
            <TextField
              variant='outlined'
              label='description'
              name='description'
              required
              value={values.description}
              onChange={handleChange}
              style={{ marginBottom: '4vh', width: '20vw' }}
            />
            <Stack direction='row'>
              <Typography variant='h5' style={{ marginRight: '2vw', alignSelf: 'center' }}>
                Повторяемость:
              </Typography>
              <Select
                label='Arbitrary'
                value={repetition}
                onChange={handleRepetitionChange}
                sx={{ width: '8.3vw' }}
              >
                <MenuItem value='one-time'>One-time</MenuItem>
                <MenuItem value='DAILY'>Daily</MenuItem>
                <MenuItem value='WEEKLY'>Weekly</MenuItem>
                <MenuItem value='MONTHLY'>Monthly</MenuItem>
                <MenuItem value='YEARLY'>Yearly</MenuItem>
              </Select>
            </Stack>
            <Stack direction='row' sx={{ mt: '3vh' }}>
              {repetition !== 'one-time' && (
                <>
                  <Typography variant='h5' sx={{ mr: '0.75vw' }}>
                    Дата окончания:
                  </Typography>
                  <Box>
                    <DatePicker
                      multiple={false}
                      value={endDate}
                      name='endDate'
                      onChange={handleEndDateChange}
                      format='DD.MM.YYYY'
                      render={<Icon />}
                    />
                  </Box>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Button
        variant='contained'
        type='submit'
        sx={{
          bgcolor: 'general.lightGreen',
          ':hover': { bgcolor: 'general.hoverGreen' },
          marginTop: '57vh',
          ml: '72vw',
          position: 'fixed'
        }}
        onClick={handleSubmit}
      >
        Add event
      </Button>
    </>
  );
};
export default Scheduler;
