import { SyntheticEvent, useEffect, useState } from 'react';
import { Table } from '../../other/Table/Table';
import { TcpPortInput } from '../../other/TcpPortInput/TcpPortInput';
import { Select } from '../../other/Select/Select';

import tableStyles from '../../other/Table/Table.module.css';

export const Converters = () => {
  const [table, setTable] = useState(<></>);
  const [connectionTypes, setConnectionTypes] = useState([]);

  function removeConverter(event: { target: { value: string } }) {
    window.electron.ipcRenderer.sendMessage('delete-converters', [
      event.target.value,
    ]);
  }

  function getConverters() {
    window.electron.ipcRenderer.sendMessage('get-converters');
    window.electron.ipcRenderer.once('get-converters', (args) => {
      setTable(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        args.map(
          (row: {
            id: number;
            name: string;
            type: string;
            address: string;
          }) => {
            const { id, name, type, address } = row;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{type}</td>
                <td>{address}</td>
                <td>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <button
                    className={tableStyles.btnDanger}
                    type="button"
                    value={id}
                    onClick={removeConverter}
                  >
                    remove
                  </button>
                </td>
              </tr>
            );
          }
        )
      );
    });
  }

  function getConnectionTypes() {
    window.electron.ipcRenderer.sendMessage('get-connection-types');
    window.electron.ipcRenderer.once('get-connection-types', (args) => {
      setConnectionTypes(args);
    });
  }

  function addConverter(e: SyntheticEvent) {
    e.preventDefault();
    // console.log(e.target.elements)
    const target = e.target as typeof e.target & {
      name: { value: string };
      type: { value: string };
      address: { value: string };
    };

    window.electron.ipcRenderer.sendMessage('post-converters', [
      {
        name: target.name.value,
        type: target.type.value,
        address: target.address.value,
      },
    ]);
  }

  useEffect(() => {
    getConnectionTypes();
    getConverters();

    window.electron.ipcRenderer.on('reload-converters', () => {
      getConverters();
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners('reload-converters');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>type</th>
          <th>address</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
        </tr>
      </thead>
      <tbody>{table}</tbody>
      <tfoot>
        <tr>
          <td>
            <form onSubmit={addConverter} id="new-converter">
              new
            </form>
          </td>
          <td>
            <input
              form="new-converter"
              type="text"
              name="name"
              defaultValue="device"
              required
            />
          </td>
          <td>
            <Select
              form="new-converter"
              name="type"
              options={connectionTypes}
            />
          </td>
          <td>
            <TcpPortInput form="new-converter" name="address" />
          </td>
          <td>
            <button
              className={tableStyles.btnSuccess}
              form="new-converter"
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
