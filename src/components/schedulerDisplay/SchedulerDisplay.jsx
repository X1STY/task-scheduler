import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import Icon from 'react-multi-date-picker/components/icon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getUserEvents } from '../../utils/requests/UserEvents';
import { EditEventForm } from '../popUpEditEventForm/EditEventForm';
import { PopUpForm } from '../popUpEditEventForm/PopUpForm';

import { dayOfWeek, groupEventsByDates } from './groupEventsByDates';
import useScheduler from './useScheduler';

const SchedulerDisplay = () => {
  const [values, setValues] = useState();
  const { startDate, endDate, setDates, handleDeleteEvent, handleEditEvent, popUpData } =
    useScheduler();
  const [openForm, setOpenForm] = useState(false);

  const { data, isLoading } = useQuery(
    ['events', startDate, endDate],
    () => getUserEvents(startDate, endDate),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const groupedData = groupEventsByDates(data.data);
  // console.log(popUpData);
  return (
    <Stack
      direction='column'
      sx={{
        mt: 45,
        ml: '12vw',
        height: '100vh',
        width: '50vw',
        position: 'absolute'
      }}
    >
      <Stack direction='row' sx={{ mb: '5vh', display: 'flex', alignItems: 'center' }}>
        <Typography variant='h5' sx={{ mr: '2vw' }}>
          Выберете диапазон дат для отображения ивентов
        </Typography>
        <DatePicker
          range
          value={values}
          onChange={setValues}
          onClose={() => setDates(values)}
          format='DD.MM.YYYY'
          render={<Icon />}
        />
      </Stack>

      {Object.entries(groupedData).map(([date, events]) => (
        <div key={date}>
          <Typography variant='h4' sx={{ mb: '1vh' }}>{`${dayOfWeek(date)} ${date}`}</Typography>
          {events.map((event, index) => (
            <Stack key={index} direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='h5'
                sx={{ mb: '1vh' }}
              >{`${event.time} ${event.description}`}</Typography>
              <IconButton
                sx={{ mt: '-1vh' }}
                onClick={() => {
                  handleEditEvent(date, event);
                  setOpenForm(true);
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton sx={{ mt: '-1vh' }} onClick={() => handleDeleteEvent(event.id)}>
                <DeleteIcon />
              </IconButton>

              <PopUpForm openForm={openForm} setOpenForm={setOpenForm} title={'Change event data'}>
                <EditEventForm value={popUpData} />
              </PopUpForm>
            </Stack>
          ))}
        </div>
      ))}
    </Stack>
  );
};

export default SchedulerDisplay;
