import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import Icon from 'react-multi-date-picker/components/icon';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getUserEvents } from '../../utils/requests/UserEvents';

import EventDisplay from './EventDisplay';
import useScheduler from './useScheduler';

const SchedulerDisplay = () => {
  const [values, setValues] = useState();
  const { startDate, endDate, setDates } = useScheduler();

  const { data, isLoading } = useQuery(
    ['events', startDate, endDate],
    () => getUserEvents(startDate, endDate),
    {
      refetchOnWindowFocus: false
    }
  );
  if (isLoading) {
    return (
      <Typography
        variant='h4'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        Loading...
      </Typography>
    );
  }
  return (
    <Stack
      direction='column'
      sx={{
        mt: 38,
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
        <Box sx={{ textAlign: 'center' }}>
          <DatePicker
            range
            value={values}
            onChange={setValues}
            onClose={() => setDates(values)}
            format='DD.MM.YYYY'
            render={<Icon />}
          />
        </Box>
      </Stack>

      <EventDisplay event={data.data} access_type={'OWNER'} />
    </Stack>
  );
};

export default SchedulerDisplay;
