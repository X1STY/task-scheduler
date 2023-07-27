import { Controller, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { useAuthContext } from '../../../contexts/auth/useAuthContext.jsx';
import { authorizateUser } from '../../../utils/requests/UserAuth.js';

import { emailValidation, passwordValidation } from './validation.js';

import './Login.css';

const Login = () => {
  const { handleSubmit, control } = useForm();
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const { errors } = useFormState({
    control
  });
  const mutation = useMutation(authorizateUser);

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data, {
        onSuccess: (response) => {
          const token = response.data.access_token;
          if (token) {
            localStorage.setItem('token', token);
            setAuth({ token: token, isAuth: true });
          }
          navigate('/scheduler');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login-form'>
      <form className='login-form__form' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='email'
          rules={emailValidation}
          defaultValue=''
          render={({ field }) => (
            <TextField
              label='Enter email'
              type='email'
              onChange={(e) => field.onChange(e)}
              value={field.value}
              size='small'
              margin='normal'
              className='login-form__input'
              fullWidth={true}
              error={!!errors.email?.message}
              helperText={errors?.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          rules={passwordValidation}
          defaultValue=''
          render={({ field }) => (
            <TextField
              label='Enter password'
              type='password'
              onChange={(e) => field.onChange(e)}
              value={field.value}
              size='small'
              margin='normal'
              className='login-form__input'
              fullWidth={true}
              error={!!errors.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth={true}
          disableElevation={true}
          sx={{
            bgcolor: '#93B492',
            ':hover': { backgroundColor: '#6d8c6c' },
            marginTop: 2
          }}
        >
          Sign in
        </Button>

        <Typography textAlign='center' variant='body2' margin={2}>
          Do not have an account?{' '}
          <span className='link' onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </Typography>
      </form>
    </div>
  );
};

export default Login;
