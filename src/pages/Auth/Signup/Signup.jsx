import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import instance from '../../../utils/api/instance';

import { Button, Stack, TextField, Typography } from '@mui/material';
import '../Auth.css'

const Signup = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const mutation = useMutation(user => addUser(user))

    async function addUser(userData) {
        return instance.post('/user', userData)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = {
                full_name: fullName,
                email,
                password
            }
            mutation.mutate(userData)
            console.log(userData)
            navigate('/')
        } catch (e) {
            return e
        }
    }

  return (
    <form className='form' onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column">

            <Typography textAlign="center" variant='body2'>Enter your full name</Typography>
            <TextField fullWidth={true} variant="outlined" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>

            <Typography textAlign="center" variant='body2'>Enter your email</Typography>
            <TextField fullWidth={true} variant="outlined" label="email" value={email} onChange={(e) => setEmail(e.target.value) }/>

            <Typography textAlign="center" variant='body2'>Enter password</Typography>
            <TextField type="password" fullWidth={true} variant="outlined" label="password" value={password} onChange={(e) => setPassword(e.target.value) }/>

            <Button variant="contained" type="onSubmit"> Register </Button>

            <Typography textAlign="center" variant="body2">
                Already have an account? <span className='link' onClick={() => navigate('/login')}>Login</span>
            </Typography>

        </Stack>
    </form>
    )
}

export default Signup