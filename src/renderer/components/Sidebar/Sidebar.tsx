import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link className={styles.link} to="/">
        DEVICES
      </Link>
      <Link className={styles.link} to="/converters.html">
        CONVERTERS
      </Link>
      <Link className={styles.link} to="/slaves.html">
        SLAVE DEVICES
      </Link>
      <Link className={styles.link} to="/databases.html">
        DATABASES
      </Link>
    </div>
  );
};
