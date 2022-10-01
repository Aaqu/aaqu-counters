import { SyntheticEvent } from 'react';
import { TcpPortInput } from '../../other/TcpPortInput/TcpPortInput';

import styles from './Devices.module.css';

export const Devices = () => {
  function read(e: SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      sample: { value: string };
      address: { value: string };
      converter: { value: string };
    };

    window.electron.ipcRenderer.sendMessage('dmm-start', [
      {
        sample: target.sample.value,
        address: target.address.value,
        converter: target.converter.value,
      },
    ]);

    console.log({
      sample: target.sample.value,
      address: target.address.value,
      converter: target.converter.value,
    });
  }

  function stop() {
    window.electron.ipcRenderer.sendMessage('dmm-stop');
  }

  return (
    <>
      <h1>DMM-5T-3</h1>
      <h3>Read</h3>

      <form onSubmit={read}>
        <div className={styles.row}>
          <label htmlFor="sample">
            <div>sample number</div>
            <input type="number" name="sample" min="1" required />
          </label>

          <label htmlFor="address">
            <div>device address</div>
            <input type="number" name="address" defaultValue="1" required />
          </label>

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="converter">
            <div>device address</div>
            <TcpPortInput id="converter" name="converter" />
          </label>
        </div>

        <div>
          <button type="submit">START READ</button>
          <button type="button" onClick={stop}>
            START STOP
          </button>
        </div>
      </form>

      <h3>Export</h3>
      <label htmlFor="sample">
        <div>sample number</div>
        <input type="number" name="sample" min="1" required />
      </label>
      <button type="button">Save</button>
    </>
  );
};
