import React from 'react';
import { Link } from 'react-router-dom';
import usePost from '../hooks/usePost';
import styles from '../styles/PrePost.module.css';
import dateConvert from '../utils/dateConvert';

function PreviewPost({ post }) {
  return (
    <div className={`${styles.wrapper_post}`}>
      {/*for post info */}
      <div className={styles.left_section}>
        <div className={styles.wrap_title}>
          <Link to={`/${post._id}`} className={styles.title}>
            {post.title}
          </Link>
        </div>
        <div className={styles.post_info}>
          {/* make it redirect to profile is a good idea  */}
          <p className={styles.info}>{post.owner.username}</p>
          <p className={styles.info}>{dateConvert(post.createdAt)}</p>
        </div>
      </div>
      {/* for something */}
      <div></div>

      {/* actions, maybe */}
      <div></div>
    </div>
  );
}

export default PreviewPost;
