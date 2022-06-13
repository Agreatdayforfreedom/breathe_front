import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import styles from '../styles/Form.module.css';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth, auth, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([username, password].includes('')) {
      setAlert({
        message: 'Please enter your username and password',
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 5000);
      return;
    }
    console.log(auth);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        { username, password }
      );
      setAlert({});
      localStorage.setItem('tkn', data.token);
      setAuth({
        _id: data._id,
        username: data.username,
        email: data.email,
      });
      navigate('/');
    } catch (error) {
      setAlert({
        message: error.response.data.msg,
        error: true,
      });
    }
  };

  const { message } = alert;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="name">
          username
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
          password
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
      <div className={`wrapper_submit`}>
        <input type="submit" className={`btn btn_submit`} value="Sign in" />
      </div>
      {message && <Alert alert={alert} />}
    </form>
  );
};

export default Login;
