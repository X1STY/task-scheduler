import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { groupEventsByDates } from './groupEventsByDates';

const SchedulerDisplay = ({ dates }) => {
  const groupedData = groupEventsByDates(dates);
  console.log(dates);
  return (
    <Stack direction='column' sx={{ ml: 110, mt: 70 }}>
      {Object.entries(groupedData).map(([date, meetings]) => (
        <div key={date}>
          <Typography variant='h3'>{date}</Typography>
          {meetings.map((meeting, index) => (
            <Box key={index} mt={2}>
              <Typography>{`${meeting.time} ${meeting.desc}`}</Typography>
            </Box>
          ))}
        </div>
      ))}
    </Stack>
  );
};

export default SchedulerDisplay;
