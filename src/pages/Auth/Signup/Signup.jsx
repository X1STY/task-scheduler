import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { useAuthContext } from '../../../contexts/auth/useAuthContext';
import useForm from '../../../utils/hooks/useForm';
import { registerUser } from '../../../utils/requests/UserAuth';

import '../../../assets/Auth.css';

const Signup = () => {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const mutation = useMutation(registerUser);

  const { values, handleChange, handleSubmit } = useForm(
    { fullName: '', email: '', password: '' },
    async (values) => {
      const userData = {
        full_name: values.fullName,
        email: values.email.toLowerCase(),
        password: values.password
      };
      try {
        mutation.mutate(userData, {
          onSuccess: (response) => {
            setAuth({ token: response.data.access_token, isAuth: true });
            localStorage.setItem('token', response.data.access_token);
            navigate('/scheduler');
          }
        });
      } catch (error) {
        return error;
      }
    }
  );

  return (
    <form className='form' onSubmit={handleSubmit}>
      <Stack spacing={8} sx={{ minWidth: 400 }}>
        <TextField
          fullWidth={true}
          variant='outlined'
          label='Full Name'
          name='fullName'
          required
          value={values.fullName}
          onChange={handleChange}
        />
        <TextField
          fullWidth={true}
          variant='outlined'
          label='email'
          name='email'
          type='email'
          required
          value={values.email}
          onChange={handleChange}
        />
        <TextField
          type='password'
          fullWidth={true}
          variant='outlined'
          label='password'
          name='password'
          required
          value={values.password}
          onChange={handleChange}
        />
        <Button
          variant='contained'
          type='onSubmit'
          sx={{
            bgcolor: 'general.lightGreen',
            ':hover': { backgroundColor: 'general.hoverGreen' }
          }}
        >
          Register
        </Button>
        <Typography textAlign='center' variant='body2'>
          Already have an account?
          <span className='link' onClick={() => navigate('/login')}>
            Login
          </span>
        </Typography>
      </Stack>
    </form>
  );
};

export default Signup;
