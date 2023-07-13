import { Box, Button, List, ListItem } from '@mui/material';

const sections = [
  { sectionName: 'section 1' },
  { sectionName: 'section 2' },
  { sectionName: 'section 3' }, //temp
  { sectionName: 'section 4' },
  { sectionName: 'section 5' },
  { sectionName: 'section 6' },
  { sectionName: 'section 7' }
];

const Sidebar = () => {
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
                key={key}
                sx={{
                  margin: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 24,
                  ':hover': { bgcolor: 'general.lightGreen' }
                }}
              >
                <Box>{val.sectionName}</Box>
              </ListItem>
            );
          })}
        </List>
      </>
    </Box>
  );
};

export default Sidebar;
