import React from "react";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { loginThunk } from "../../store/slices/authSlices";

export const Login = () => {
  const { register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { data } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  
  const submitForm = (values) => {
    dispatch(loginThunk(values))
  }

  const navigate = useNavigate()

  if(Boolean(data)) {
    return navigate('/')
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={errors.email}
          helperText={errors.email && "Укажите почту"}
          fullWidth
          {...register("email", {required: true})}
        />
        <TextField 
          className={styles.field} 
          label="Пароль" fullWidth 
          {...register('password', {required: true})}
          error={errors.password}
          helperText={errors.password && "Укажите пароль"}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
