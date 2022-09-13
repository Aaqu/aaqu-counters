import { useEffect, useState } from 'react';

import styles from './Converters.module.css';

export const Converters = () => {
  const [table, setTable] = useState(<></>);

  const removeConverter = (event) => {
    window.electron.ipcRenderer.sendMessage('delete-converters', [
      event.target.value,
    ]);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('get-converters', (arg) => {
      console.log(arg);

      setTable(
        arg.map(({ id, name, type, address }, index) => {
          return (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{type}</td>
              <td>{address}</td>
              <td>
                <button type="button" value={id} onClick={removeConverter}>
                  remove
                </button>
              </td>
            </tr>
          );
        })
      );
    });
    window.electron.ipcRenderer.sendMessage('get-converters');
    return () => {
      window.electron.ipcRenderer.removeAllListeners('get-converters');
    };
  }, []);

  const addConverter = (event) => {
    event.preventDefault();
    window.electron.ipcRenderer.sendMessage('post-converters', [
      {
        name: event.target.elements.name.value,
        type: event.target.elements.type.value,
        address: event.target.elements.address.value,
      },
    ]);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>type</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {table}
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
              />
            </td>
            <td>
              <input
                form="new-device"
                type="text"
                name="type"
                defaultValue="tcp"
              />
            </td>
            <td>
              <input
                form="new-device"
                type="text"
                name="address"
                defaultValue="192.168.1.8:26"
              />
            </td>
            <td>
              <input form="new-device" type="submit" value="ADD" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
