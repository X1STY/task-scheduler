import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import './Login.css';
import {emailValidation, passwordValidation} from "./validation";
import React from 'react';

const Login = () => {
    const {handleSubmit, control} = useForm();
    const { errors } = useFormState({
        control
    });
    const navigate = useNavigate()
    const onSubmit: SubmitHandler = (data) => console.log(data);

    return (
        <div className = "login-form">
            <form className="login-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
                    rules={emailValidation}
                    render={({field}) => (
                        <TextField
                            label="Enter email"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            size="small"
                            margin="normal"
                            className="login-form__input"
                            fullWidth={true}
                            error={!!errors.email?.message}
                            helperText={errors?.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({field}) => (
                        <TextField
                            label="Enter password"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            size="small"
                            margin="normal"
                            className="login-form__input"
                            fullWidth={true}
                            error={!!errors.password?.message}
                            helperText={errors?.password?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    disableElevation={true}
                    sx={{
                        bgcolor: '#93B492',
                        marginTop: 2
                    }}
                >
                    Sign in
                </Button>

                <Typography textAlign="center" variant="body2" margin={2}>
                    Don't have an account? <span className='link' onClick={() => navigate('/signup')}>Sign up</span>
                </Typography>
            </form>
        </div>
    )
}

export default Login