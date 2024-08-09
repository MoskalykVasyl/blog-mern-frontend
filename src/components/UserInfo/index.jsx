import React from 'react';
import styles from './UserInfo.module.scss';
import { formatTime } from '../../utils/formatTime';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={`${process.env.REACT_APP_API_URL}${avatarUrl}`} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{formatTime(additionalText)}</span>
      </div>
    </div>
  );
};
