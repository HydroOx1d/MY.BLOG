import React from 'react';
import styles from './UserInfo.module.scss';

const getDate = (additionalText) => {
  const date = new Date(additionalText)

  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
};

export const UserInfo = ({ avatarUrl, username, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || "/noavatar.png"}
        alt={username}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.additional}>{getDate(additionalText)}</span>
      </div>
    </div>
  );
};
