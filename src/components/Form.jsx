import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Form.module.css';
import usePost from '../hooks/usePost';
import Alert from './Alert';

function Form() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');

  const { alert, loading, post, submitPost } = usePost();
  const params = useParams();

  useEffect(() => {
    const fill = async () => {
      if (params.id) {
        setTitle(post.title);
        setSubject(post.subject);
        setId(post._id);
      }
    };
    fill();
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      submitPost({ title, subject });
    } else {
      submitPost({
        title,
        subject,
        id,
      });
    }
  };

  const { message } = alert;
  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <legend className={styles.legend}>
          {params.id ? 'Update item' : 'New Item'}
        </legend>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="title">
            title
          </label>
          <input
            className={styles.input_item}
            type="text"
            name="title"
            id="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="subject">
            subject
          </label>
          <textarea
            className={styles.input_item}
            name="subject"
            id="subject"
            placeholder="subject here"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="container">
          <button className="btn btn_submit">
            {params.id ? 'Save changes' : 'Create item'}
          </button>
        </div>

        {message && <Alert alert={alert} />}
      </form>
    </div>
  );
}

export default Form;
