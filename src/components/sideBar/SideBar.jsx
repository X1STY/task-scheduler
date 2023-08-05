import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getEventsInSection, getUserSections } from '../../utils/requests/UserSections';
import useScheduler from '../schedulerDisplay/useScheduler';

const Sidebar = () => {
  const { startDate, endDate } = useScheduler();
  const { data, isLoading } = useQuery(['sections'], () => getUserSections(), {
    refetchOnWindowFocus: false
  });
  const getEventsFromSectionMutation = useMutation(getEventsInSection);
  const queryClient = useQueryClient();

  const handleChangeSection = (e, id) => {
    e.preventDefault();
    console.log(id);
    getEventsFromSectionMutation.mutate(id, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(['events', startDate, endDate]);
        console.log(response);
      }
    });
  };

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
  const sections = data.data;
  return (
    <Box sx={{ height: '100vh', width: '12vw', position: 'fixed', mt: 24 }}>
      <>
        <Button
          variant='contained'
          sx={{
            bgcolor: 'general.lightGreen',
            ':hover': { bgcolor: 'general.hoverGreen' },
            mt: 20,
            mb: 40,
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%'
          }}
        >
          Edit user profile
        </Button>
        <List sx={{ height: '70%', width: '100%', padding: 0, overflow: 'auto' }}>
          {sections.map((val, key) => {
            return (
              <ListItem
                onClick={(e) => handleChangeSection(e, val.section_id)}
                key={key}
                sx={{
                  cursor: 'pointer',
                  margin: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'start',
                  fontSize: 24,
                  ':hover': { bgcolor: 'general.lightGreen' }
                }}
              >
                <Typography fontSize='1.5rem'>{val.title}</Typography>
              </ListItem>
            );
          })}
        </List>
      </>
    </Box>
  );
};

export default Sidebar;
