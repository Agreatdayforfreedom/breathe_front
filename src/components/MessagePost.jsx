import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import usePost from '../hooks/usePost';
import styles from '../styles/TagPost.module.css';
import dateConvert from '../utils/dateConvert';

const MessagePost = ({ message }) => {
  const { auth } = useAuth();

  const { loading, deletePost } = usePost();

  const handleDelete = async (e) => {
    e.preventDefault();

    alert('Are you sure you want to delete this post?');
    if (alert) {
      // await deletePost(post._id);
    }
  };
  console.log(message);
  // const { title, subject, createdAt, owner } = post;

  // if (loading) return 'loading';

  return (
    <div className={styles.section_content}>
      <header className={styles.actions_date}>
        <p className={styles.date_text}>{dateConvert(message.createdAt)}</p>
        <div className={styles.wrapper_actions}>
          {auth._id === message.emitter ? (
            <>
              <Link to={'/'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 svg_edit"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </Link>

              <button className="btn_none" onClick={handleDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 svg_remove"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>
      <p className={styles.subject_post}>{message.message}</p>
    </div>
  );
};

export default MessagePost;
