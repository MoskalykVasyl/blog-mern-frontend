import React from 'react';
import styles from './UserInfo.module.scss';
import { formatTime } from '../../utils/formatTime';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={`http://localhost:4444${avatarUrl}`} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{formatTime(additionalText)}</span>
      </div>
    </div>
  );
};
