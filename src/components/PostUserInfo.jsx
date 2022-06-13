import React from 'react';
import styles from '../styles/PostUserInfo.module.css';

const PostUserInfo = ({ owner, message }) => {
  console.log(owner);
  console.log(message, 'hello');
  return (
    <div className={`${styles.info_user} ${styles.box_post}`}>
      <div className="wrapper_user_info">
        <img
          src={'src/imgs/notfound.png'}
          className={styles.avatar_user}
          alt="not found image"
        />
        <p className="user_name">
          {message ? message.emitter.username : owner.username}
        </p>
      </div>
    </div>
  );
};

export default PostUserInfo;
