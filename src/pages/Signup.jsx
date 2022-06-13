import axios from 'axios';
import React, { useState } from 'react';
import Alert from '../components/Alert';
import styles from '../styles/Form.module.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([username, password, rPassword].includes('')) {
      setAlert({
        message: 'Complete the required fields',
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 5000);
      return;
    }
    if (password.length < 6) {
      setAlert({
        message: 'Password must not be less than 6 characters',
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 5000);
      return;
    }
    if (password !== rPassword) {
      setAlert({
        message: 'Passwords are not equal',
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 5000);
      return;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      {
        username,
        email,
        password,
      }
    );
    setAlert({
      message: data.msg,
      error: false,
    });
  };

  const { message } = alert;

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="name">
            username <span className={styles.asterik_required}>*</span>
          </label>
          <input
            className={styles.input_item}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="email">
            email
          </label>
          <input
            className={styles.input_item}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="password">
            password <span className={styles.asterik_required}>*</span>
          </label>
          <input
            className={styles.input_item}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="rpassword">
            repeat password <span className={styles.asterik_required}>*</span>
          </label>
          <input
            className={styles.input_item}
            type="password"
            name="rpassword"
            id="rpassword"
            placeholder="Repeat password"
            value={rPassword}
            onChange={(e) => setRPassword(e.target.value)}
          />
        </div>
        <div className={`wrapper_submit`}>
          <input type="submit" className={`btn btn_submit`} value="Sign up" />
        </div>
        {message && <Alert alert={alert} />}
      </form>
    </div>
  );
}

export default Signup;
