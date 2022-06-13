import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from '../styles/Header.module.css';

function Header() {
  const { auth, loading } = useAuth();

  if (loading) return 'loading';
  return (
    <header className={styles.header}>
      <div className={`${styles.header_wrapper} container`}>
        <Link to="/">
          <h2 className={styles.header_title}>Breathe</h2>
        </Link>

        {auth._id ? (
          <Link to="/new-post" className={styles.link}>
            <p className="interactive_link">New Post</p>
          </Link>
        ) : (
          <div className={styles.links}>
            <Link to="/login" className={styles.link}>
              Sign in
            </Link>
            <Link
              to="/signup"
              className={`${styles.link} ${styles.link_border}`}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
