import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const fullData = {...values, imageUrl};
    const data = await dispatch(fetchRegister(fullData));

    if (!data.payload) {
      return alert('Не получилось зареєструватися');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  const handleChangeFile = async(event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file)
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/uploadAvatar`, formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Помилка при завантажені файлу');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Реєстрація
      </Typography>
      {/* <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div> */}
     
      
      <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile}  hidden />
      {imageUrl ? (
        <>
       
        <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
        <Button classes={{root:styles.button}} variant="contained" onClick={onClickRemoveImage} color="error" >
          Видалити
        </Button>
        </>
      ) : (
        <img className={styles.image} src='https://static.vecteezy.com/system/resources/previews/009/952/572/original/male-profile-picture-vector.jpg' alt='defaultAvatar'  />
      )}
       <Button classes={{root:styles.button}} onClick={()=>inputFileRef.current.click()} variant="outlined" size="large">
        Загрузити фото
      </Button>
      <TextField
        className={styles.field}
        label="Повне ім'я"
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: 'Вкажіть повне імя' })}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', { required: 'Вкажіть електорну адресу' })}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="Пароль"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', { required: 'Вкажіть пароль' })}
        fullWidth
      />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Створити обліковий запис
      </Button>
      </form>
    </Paper>
  );
};
