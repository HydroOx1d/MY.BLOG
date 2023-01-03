import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { registerThunk } from '../../store/slices/authSlices';

export const Registration = () => {
  const navigate = useNavigate()
  const { data } = useSelector(state => state.auth)

  if(Boolean(data)) {
    navigate('/')
  }

  const { register, handleSubmit, formState: { errors, isValid}} = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const dispatch = useDispatch()

  const submitRegister = (values) => {
    dispatch(registerThunk(values))
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(submitRegister)}>
        <TextField 
          className={styles.field} 
          label="Полное имя" 
          fullWidth 
          error={Boolean(errors.username?.message)}
          helperText={errors.username?.message}
          {...register('username', {required: 'Укажите полное имя'})}
        />
        <TextField 
          className={styles.field} 
          label="E-Mail" 
          fullWidth 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Укажите почту'})}
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {required: 'Укажите пароль'})}
        />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
