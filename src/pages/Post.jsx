import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import usePost from '../hooks/usePost';
import useAuth from '../hooks/useAuth';
import styles from '../styles/Post.module.css';
import dateConvert from '../utils/dateConvert';

import notfound from '../imgs/notfound.png';
import PostUserInfo from '../components/PostUserInfo';
import MessagePost from '../components/MessagePost';
import PostSubject from '../components/PostSubject';
import { useState } from 'react';
import Message from '../components/Message';

const Post = () => {
  const params = useParams();

  const { getPost, post, loading } = usePost();
  useEffect(() => {
    getPost(params.id);
  }, [params]);

  const { owner } = post;
  if (loading) return 'loading...';
  return (
    <>
      <div className={`${styles.wrapper_content}`}>
        <div className={styles.box_post}>
          <PostUserInfo owner={owner} />
          <PostSubject post={post} />
        </div>
      </div>
      {post.messages.length === 0 ? (
        <p>there is not messages</p>
      ) : (
        post.messages.map((message) => (
          <div className={`${styles.wrapper_content} ${styles.box_post}`}>
            <PostUserInfo owner={owner} message={message} />
            <MessagePost message={message} />
          </div>
        ))
      )}
      <div className={`${styles.wrapper_content}`}>
        <div className={styles.box_post}>
          <PostUserInfo owner={owner} />
          <Message postId={post._id} />
        </div>
      </div>
    </>
  );
};

export default Post;
