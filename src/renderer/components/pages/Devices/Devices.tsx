import { SyntheticEvent, useEffect, useState } from 'react';
import { TcpPortInput } from '../../other/TcpPortInput/TcpPortInput';

import styles from './Devices.module.css';

export const Devices = () => {
  const [started, setStarted] = useState(false);
  const [response, setResponse] = useState(<></>);

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
    setStarted(true);
  }

  function stop() {
    window.electron.ipcRenderer.sendMessage('dmm-stop');
    setStarted(false);
  }

  function exportSample(e) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      sample: { value: string };
    };

    window.electron.ipcRenderer.sendMessage('dmm-export', [
      {
        sample: Number(target.sample.value),
      },
    ]);
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('dmm-read', (args) => {
      setResponse(
        <div>
          <div />
          <table>
            <thead>
              <tr>
                <th style={{ width: '300px' }}>col</th>
                <th style={{ width: '100px' }}>col</th>
                <th style={{ width: '100px' }}>col</th>
                <th style={{ width: '100px' }}>col</th>
                <th style={{ width: '100px' }}>col</th>
                <th style={{ width: '100px' }}>col</th>
                <th style={{ width: '100px' }}>col</th>
                <th style={{ width: '100px' }}>col</th>
                <th style={{ width: '100px' }}>col</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  data: <strong>{args[33].toISOString()}</strong>
                </td>
                <td>
                  current ratio: <strong>{args[0]}</strong>
                </td>
                <td>
                  voltage ratio: <strong>{args[1]}V</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Voltage</td> */}
                <td>Napięcie</td>
                <td>L1: </td>
                <td>
                  <strong>{args[2]} V</strong>
                </td>
                <td>L2: </td>
                <td>
                  <strong>{args[3]} V</strong>
                </td>
                <td>L3: </td>
                <td>
                  <strong>{args[4]} V</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Voltage</td> */}
                <td>Napięcie</td>
                <td>L12:</td>
                <td>
                  <strong>{args[5]} V</strong>
                </td>
                <td>L23:</td>
                <td>
                  <strong>{args[6]} V</strong>
                </td>
                <td>L31:</td>
                <td>
                  <strong>{args[7]} V</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Current</td> */}
                <td>Prąd</td>
                <td>L1:</td>
                <td>
                  <strong>{args[8]} A</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[9]} A</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[10]} A</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Frequency</td> */}
                <td>Częstotliwość</td>
                <td>L1:</td>
                <td>
                  <strong>{args[11]} Hz</strong>
                </td>
                <td>L2: </td>
                <td>
                  <strong>{args[12]} Hz</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[13]} Hz</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Active power</td> */}
                <td>Moc czynna</td>
                <td>L1:</td>
                <td>
                  <strong>{args[14]} W</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[15]} W</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[16]} W</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[17]} W</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Reactive power</td> */}
                <td>Moc bierna</td>
                <td>L1:</td>
                <td>
                  <strong>{args[18]} Var</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[19]} Var</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[20]} Var</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[21]} Var</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Apparent power</td> */}
                <td>Moc pozorna</td>
                <td>L1:</td>
                <td>
                  <strong>{args[22]} VA</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[23]} VA</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[24]} VA</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[25]} VA</strong>
                </td>
              </tr>
              <tr>
                <td>cosφ</td>
                <td>L1:</td>
                <td>
                  <strong>{args[26]}</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[27]}</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[28]}</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Power factor</td> */}
                <td>Współczynnik mocy</td>
                <td>L1:</td>
                <td>
                  <strong>{args[29]}</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[30]}</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[31]}</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[32]}</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Active energy consumed</td> */}
                <td>Energia czynna pobrana</td>
                <td>L1:</td>
                <td>
                  <strong>{args[34]} Wh</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[35]} Wh</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[36]} Wh</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[37]} Wh</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Active energy released</td> */}
                <td>Energia czynna oddana</td>
                <td>L1:</td>
                <td>
                  <strong>{args[38]} Wh</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[39]} Wh</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[40]} Wh</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[41]} Wh</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Inductive energy</td> */}
                <td>Energia indukcyjna</td>
                <td>L1:</td>
                <td>
                  <strong>{args[42]} Varh</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[43]} Varh</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[44]} Varh</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[45]} Varh</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Capacitive energy</td> */}
                <td>Energia pojemnościowa</td>
                <td>L1:</td>
                <td>
                  <strong>{args[46]} Varh</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[47]} Varh</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[48]} Varh</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[49]} Varh</strong>
                </td>
              </tr>
              <tr>
                {/* <td>Apparent energy</td> */}
                <td>Energia pozorna</td>
                <td>L1:</td>
                <td>
                  <strong>{args[50]} Vha</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[51]} Vha</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[52]} Vha</strong>
                </td>
                <td>Total:</td>
                <td>
                  <strong>{args[53]} Vha</strong>
                </td>
              </tr>
              <tr>
                <td>THDV</td>
                <td>L1:</td>
                <td>
                  <strong>{args[54]} %</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[55]} %</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[56]} %</strong>
                </td>
                <td>3P:</td>
                <td>
                  <strong>{args[57]} %</strong>
                </td>
              </tr>
              <tr>
                <td>THDI</td>
                <td>L1:</td>
                <td>
                  <strong>{args[58]} %</strong>
                </td>
                <td>L2:</td>
                <td>
                  <strong>{args[59]} %</strong>
                </td>
                <td>L3:</td>
                <td>
                  <strong>{args[60]} %</strong>
                </td>
                <td>3P:</td>
                <td>
                  <strong>{args[61]} %</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
    return () => {
      window.electron.ipcRenderer.removeAllListeners('dmm-read');
    };
  }, []);

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
          <button type="submit" disabled={started}>
            START READ
          </button>
          <button type="button" onClick={stop}>
            START STOP
          </button>
        </div>
      </form>

      <h3>Read</h3>
      <div>{response}</div>

      <h3>Export</h3>
      <form onSubmit={exportSample}>
        <label htmlFor="sample">
          <div>sample number</div>
          <input type="number" name="sample" min="1" required />
        </label>
        <button type="submit" disabled={started}>
          Save
        </button>
      </form>
    </>
  );
};
