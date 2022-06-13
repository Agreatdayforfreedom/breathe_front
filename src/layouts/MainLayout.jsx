import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/Stars.module.css';
import useAuth from '../hooks/useAuth';

function MainLayout() {
  // const { auth, loading } = useAuth();
  return (
    <div>
      <section className={styles.wrapper}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
        <div className={styles.starsA}></div>
        <div className={styles.content}>
          <Header />
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default MainLayout;
