import {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, useFormState } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {emailValidation, passwordValidation} from "./validation.js";
import './Login.css';

const Login = () => {
    const {handleSubmit, control} = useForm();
    const { errors } = useFormState({
        control
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    const mutation = useMutation((data) =>
        axios.post('https://64ad54beb470006a5ec5c676.mockapi.io/api/posts', data)
    );

    const onSubmit = async (data) => {
        try {
            await mutation.mutateAsync(data);
            const token = mutation.data.token;
            console.log(data);
            console.log(mutation.data);
            console.log(token);
            if (token) {
                localStorage.setItem('token', token);
            }
            navigate('/scheduler');
        }  catch (error) {
            if (error.response) {
                const { status } = error.response;
                let errorMessage = '';

                switch (status) {
                    case 400:
                        errorMessage = 'Некорректный ввод электронной почты или пароля';
                        break;
                    case 401:
                        errorMessage = 'Неверный адрес электронной почты или пароль';
                        break;
                    case 500:
                        errorMessage = 'Внутренняя ошибка сервера';
                        break;
                    default:
                        errorMessage = 'Произошла ошибка';
                        break;
                }

                setErrorMessage(errorMessage);
            } else {
                setErrorMessage('Произошла ошибка');
            }
        }
    };

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
                            ':hover': { backgroundColor: '#6d8c6c' },
                        marginTop: 2
                    }}
                >
                    Sign in
                </Button>

                <Typography textAlign="center" variant="body2" margin={2}>
                    Do not have an account? <span className='link' onClick={() => navigate('/signup')}>Sign up</span>
                </Typography>
            </form>
        </div>
    )
}

export default Login