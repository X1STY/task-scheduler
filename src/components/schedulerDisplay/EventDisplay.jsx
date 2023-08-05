import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { EditEventForm } from '../popUpEditEventForm/EditEventForm';
import PopUpForm from '../popUpEditEventForm/PopUpForm';

import { dayOfWeek, groupEventsByDates } from './groupEventsByDates';
import useScheduler from './useScheduler';

const EventDisplay = (props) => {
  const { event, access_type } = props;
  const { handleDeleteEvent, handleDeleteEventGroup, handleEditEvent, popUpData } = useScheduler();
  const [openForm, setOpenForm] = useState(false);
  const groupedData = groupEventsByDates(event);
  return (
    <>
      {Object.entries(groupedData).map(([date, events]) => (
        <div key={date}>
          <Typography variant='h4' sx={{ mb: '1vh' }}>{`${dayOfWeek(date)} ${date}`}</Typography>
          {events.map((event, index) => (
            <Stack key={index} direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='h5'
                sx={{ mb: '1vh' }}
              >{`${event.time} ${event.description}`}</Typography>
              {access_type !== 'VIEWER' && (
                <>
                  <Tooltip title='Edit information about event'>
                    <IconButton
                      sx={{ mt: '-1vh' }}
                      onClick={() => {
                        handleEditEvent(date, event);
                        setOpenForm(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Delete single event'>
                    <IconButton sx={{ mt: '-1vh' }} onClick={() => handleDeleteEvent(event.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {event.is_replayed && access_type !== 'VIEWER' && (
                <Tooltip title='Delete all event group'>
                  <IconButton
                    sx={{ mt: '-1vh' }}
                    onClick={() => handleDeleteEventGroup(event.event_group_id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          ))}
          <PopUpForm openForm={openForm} setOpenForm={setOpenForm} title={'Change event data'}>
            <EditEventForm value={popUpData} setOpenForm={setOpenForm} />
          </PopUpForm>
        </div>
      ))}
    </>
  );
};

export default EventDisplay;
