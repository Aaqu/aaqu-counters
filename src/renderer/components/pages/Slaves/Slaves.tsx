import { useEffect, useState } from 'react';
import { Table } from 'renderer/components/other/Table/Table';
import { Select } from '../../other/Select/Select';

import tableStyles from '../../other/Table/Table.module.css';

const converters = [{ id: 1, value: '192.168.1.8:8', label: 'converter-1' }];

export const Slaves = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [tbody, setTbody] = useState(<></>);
  const [deviceTypes, setDeviceTypes] = useState([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function addSlave(event) {
    event.preventDefault();
    console.log(event.target.elements);
  }

  function getDeviceTypes() {
    window.electron.ipcRenderer.sendMessage('get-device-types');
    window.electron.ipcRenderer.once('get-device-types', (args) => {
      setDeviceTypes(args);
    });
  }

  useEffect(() => {
    getDeviceTypes();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>type</th>
          <th>address</th>
          <th>converter</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
        </tr>
      </thead>
      <tbody>{tbody}</tbody>
      <tfoot>
        <tr>
          <td>
            <form id="new-slave" onSubmit={addSlave}>
              new
            </form>
          </td>
          <td>
            <input
              form="new-slave"
              type="text"
              name="name"
              placeholder="name"
              required
            />
          </td>
          <td>
            <Select form="new-slave" name="type" options={deviceTypes} />
          </td>
          <td>
            <input
              form="new-slave"
              type="number"
              name="name"
              placeholder="address"
              min="1"
              max="255"
              required
            />
          </td>
          <td>
            <Select form="new-slave" name="converter" options={converters} />
          </td>
          <td>
            <button
              className={tableStyles.btnSuccess}
              form="new-slave"
              type="submit"
            >
              Add
            </button>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};
