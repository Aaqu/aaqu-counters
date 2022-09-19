import { ReactNode } from 'react';

import styles from './Table.module.css';

export const Table = (props: { children: ReactNode }) => {
  const { children } = props;
  return <table className={styles.table}>{children}</table>;
};
