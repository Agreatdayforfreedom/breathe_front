import React from 'react';
import { useState } from 'react';
import usePost from '../hooks/usePost';
import styles from '../styles/Message.module.css';

const Message = ({ postId }) => {
  const [message, setMessage] = useState();

  const { newMessage, showAlert } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message === '') {
      return showAlert({
        message: 'The message is required',
        error: true,
      });
    }

    newMessage(message, postId);
  };

  return (
    <div className={styles.send_message_wrapper}>
      <form className={styles.form_message} onSubmit={handleSubmit}>
        <textarea
          id="message"
          name="message"
          placeholder="This is a message for this post"
          className={styles.textarea_message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="wrapper_submit">
          <button type="submit" className="btn btn_submit">
            {' '}
            Send your answer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Message;
