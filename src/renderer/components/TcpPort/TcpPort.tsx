import styles from './TcpPort.module.css';

export const TcpPort = () => {
  return (
    <div className={styles.tcpPort}>
      <input type="number" name="a-ip-v4" min="0" max="255" />
      .
      <input type="number" name="b-ip-v4" min="0" max="255" />
      .
      <input type="number" name="c-ip-v4" min="0" max="255" />
      .
      <input type="number" name="d-ip-v4" min="0" max="255" />
      :
      <input type="number" name="d-ip-v4" min="1" max="65535" />
    </div>
  );
};
