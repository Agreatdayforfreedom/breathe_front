import styles from '../styles/Alert.module.css';

function Alert({ alert }) {
  return (
    <div
      className={`${styles.alert} ${
        alert.error ? `${styles.alert_danger}` : `${styles.alert_success}`
      }`}
    >
      <p>{alert.message}</p>
    </div>
  );
}

export default Alert;
