import React from 'react';
import styles from '../styles/Stars.module.css';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function AuthLayout() {
  const { auth, loading } = useAuth();

  console.log(auth);

  if (loading) return 'loading...';
  return (
    <>
      {!auth._id ? (
        <section className={styles.wrapper}>
          <div className={styles.stars}></div>
          <div className={styles.stars2}></div>
          <div className={styles.stars3}></div>
          <div className={styles.content}>
            <Outlet />
          </div>
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default AuthLayout;
