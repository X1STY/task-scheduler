import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getEventsInSection } from '../../utils/requests/UserSections';

import EventDisplay from './EventDisplay';

const SectionEvents = (props) => {
  const { id, changeSection } = props;

  const { data, isLoading } = useQuery(['section-events', id], () => getEventsInSection(id), {
    refetchOnWindowFocus: false
  });

  const handleBack = () => {
    changeSection(null); // null state to not render this component and go back to SchedulerDisplay component (see Scheduler jsx)
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        mt: 38,
        ml: '12vw',
        height: 'auto',
        width: '50vw',
        position: 'absolute'
      }}
    >
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <EventDisplay event={data.data} access_type={'OWNER'} />
    </Box>
  );
};

export default SectionEvents;
