import { useState } from 'react';
import { Select } from '../../Select/Select';

import styles from './Slaves.module.css';

const database = [
  { value: 'dmm-5t-3', label: 'dmm-5t-3' },
  { value: 'other', label: 'other' },
];

export const Slaves = () => {
  const [tbody, setTbody] = useState(<></>);

  const addSlave = (event) => {
    event.preventDefault();
    console.log(event.target.elements);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>type</th>
          <th>address</th>
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
              className={styles.input}
              form="new-slave"
              type="text"
              name="name"
              placeholder="name"
              required
            />
          </td>
          <td>
            <Select form="new-slave" name="type" options={database} />
          </td>
          <td>
            <input
              className={styles.input}
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
            <button form="new-slave" type="submit">
              Add
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
