import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link className={styles.link} to="/">
        HOME
      </Link>
      <Link className={styles.link} to="/add-tcp-device.html">
        TCP DEVICES
      </Link>
      <Link className={styles.link} to="/add-slave-device.html">
        SLAVE DEVICE
      </Link>
    </div>
  );
};
