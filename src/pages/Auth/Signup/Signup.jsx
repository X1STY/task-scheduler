import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import instance from '../../../utils/api/instance';

import '../../../assets/Auth.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const mutation = useMutation((user) => addUser(user));

  //post request for backend/user and store accesToken in auth context
  //temporary we don't have a refresh token
  async function addUser(userData) {
    return instance.post('/user', userData).then((response) => {
      //localStorage.setItem('token', token)
      localStorage.setItem('token', 'simulate token');
      console.log(response);
      navigate('/scheduler');
    });
  }

  // send data to backend on form submittion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        full_name: fullName,
        email,
        password
      };
      mutation.mutate(userData);
      console.log(userData);
    } catch (e) {
      return e;
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ minWidth: 400 }}>
        <TextField
          fullWidth={true}
          variant='outlined'
          label='Full Name'
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          fullWidth={true}
          variant='outlined'
          label='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type='password'
          fullWidth={true}
          variant='outlined'
          label='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='contained'
          type='onSubmit'
          sx={{
            bgcolor: 'general.lightGreen',
            ':hover': { backgroundColor: 'general.hoverGreen' }
          }}
        >
          {' '}
          Register{' '}
        </Button>
        <Typography textAlign='center' variant='body2'>
          Already have an account?{' '}
          <span className='link' onClick={() => navigate('/login')}>
            Login
          </span>
        </Typography>
      </Stack>
    </form>
  );
};

export default Signup;
