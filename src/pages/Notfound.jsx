import { Stack, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Stack
      direction='column'
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '200px' }}
    >
      <Typography variant='h1'>404 - Page Not Found</Typography>
      <Typography variant='h4'>The requested page could not be found.</Typography>
      <Typography variant='h4'>Please check the URL or try again later.</Typography>
    </Stack>
  );
};

export default NotFoundPage;
