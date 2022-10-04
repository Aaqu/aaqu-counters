import { SyntheticEvent, useEffect, useState } from 'react';
import { Table } from 'renderer/components/other/Table/Table';
import { Select } from '../../other/Select/Select';

import tableStyles from '../../other/Table/Table.module.css';

export const Slaves = () => {
  const [tbody, setTbody] = useState(<></>);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [converters, setConverters] = useState([]);

  function getDeviceTypes() {
    window.electron.ipcRenderer.sendMessage('get-device-types');
    window.electron.ipcRenderer.once('get-device-types', (args) => {
      setDeviceTypes(args);
    });
  }

  function getConverters() {
    window.electron.ipcRenderer.sendMessage('get-converters');
    window.electron.ipcRenderer.once('get-converters', (args) => {
      const data = args.map(({ id, name, address }) => {
        return {
          id,
          value: address,
          label: `${name} (${address})`,
        };
      });
      setConverters(data);
    });
  }

  function removeSlave(event: { target: { value: string } }) {
    window.electron.ipcRenderer.sendMessage('delete-slaves', [
      { id: event.target.value },
    ]);
  }

  function getSlaves() {
    window.electron.ipcRenderer.sendMessage('get-slaves');
    window.electron.ipcRenderer.once('get-slaves', (args) => {
      setTbody(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        args.map(
          (row: {
            id: number;
            name: string;
            type: string;
            address: string;
            converter: string;
          }) => {
            const { id, name, type, address, converter } = row;

            const converterName = converters.find(
              (el) => el.value === converter
            );
            console.log(converterName);

            // const converterName = converters.find((el) => {
            //   if (el.value === converter) {
            //     return 'aaa';
            //   }
            // });

            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{type}</td>
                <td>{address}</td>
                <td>{converterName.label}</td>
                <td>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <button
                    className={tableStyles.btnDanger}
                    type="button"
                    value={id}
                    onClick={removeSlave}
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

  function addSlave(e: SyntheticEvent) {
    e.preventDefault();
    // console.log(e.target.address.value)
    const target = e.target as typeof e.target & {
      name: { value: string };
      type: { value: string };
      address: { value: string };
      converter: { value: string };
    };

    window.electron.ipcRenderer.sendMessage('post-slaves', [
      {
        name: target.name.value,
        type: target.type.value,
        address: target.address.value,
        converter: target.converter.value,
      },
    ]);
  }

  useEffect(() => {
    getDeviceTypes();
    getConverters();
    window.electron.ipcRenderer.on('reload-slaves', () => {
      getSlaves();
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners('reload-slaves');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSlaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [converters]);

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
              name="address"
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
