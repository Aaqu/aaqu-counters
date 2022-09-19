import { SyntheticEvent, useEffect, useState } from 'react';
import { Table } from '../../other/Table/Table';
import { TcpPortInput } from '../../other/TcpPortInput/TcpPortInput';

import tableStyles from '../../other/Table/Table.module.css';

export const Converters = () => {
  const [table, setTable] = useState(<></>);

  function removeConverter(event: { target: { value: string } }) {
    window.electron.ipcRenderer.sendMessage('delete-converters', [
      event.target.value,
    ]);
  }

  function getConverters() {
    window.electron.ipcRenderer.sendMessage('get-converters');
    window.electron.ipcRenderer.once('get-converters', (args) => {
      // console.log(args);

      setTable(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        args.map(
          (
            row: { id: number; name: string; type: string; address: string },
            index: number
          ) => {
            const { id, name, type, address } = row;
            return (
              <tr key={id}>
                <td>{index + 1}</td>
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
            <form onSubmit={addConverter} id="new-device">
              new
            </form>
          </td>
          <td>
            <input
              form="new-device"
              type="text"
              name="name"
              defaultValue="device"
              required
            />
          </td>
          <td>
            <input
              form="new-device"
              type="text"
              name="type"
              defaultValue="tcp"
              required
            />
          </td>
          <td>
            <TcpPortInput form="new-device" name="address" />
          </td>
          <td>
            <button
              className={tableStyles.btnSuccess}
              form="new-device"
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
