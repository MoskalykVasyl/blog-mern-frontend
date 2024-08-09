import React, { useState } from 'react';
import axios from '../../axios.js';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Index = ({ setData }) => {
  const userData = useSelector((state) => state.auth.data);
  const { id } = useParams();

  const [textComment, setTextComment] = useState('');

  const onSendComment = async () => {
    try {
      const { data } = await axios.patch(`/posts/${id}/comments`, {
        textComment,
      });
      setData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, data],
      }));
      setTextComment('');
    } catch (err) {
      console.warn(err);
      alert('Помилка при публікації коментара');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={ `${process.env.API_URL}${userData?.avatarUrl}`  } />
        <div className={styles.form}>
          <TextField
            onChange={(e) => setTextComment(e.target.value)}
            label="Написати коментра"
            variant="outlined"
            maxRows={10}
            value={textComment}
            multiline
            fullWidth
          />
          <Button onClick={onSendComment} variant="contained">
            Надіслати
          </Button>
        </div>
      </div>
    </>
  );
};
