import { useState } from 'react';
import { Table } from 'renderer/components/Table/Table';
import { Select } from '../../Select/Select';

import tableStyles from '../../Table/Table.module.css';

const types = [
  { value: 'dmm-5t-3', label: 'dmm-5t-3' },
  { value: 'other', label: 'other' },
];

const converters = [{ value: '192.168.1.8:8', label: 'converter-1' }];

export const Slaves = () => {
  const [tbody, setTbody] = useState(<></>);

  const addSlave = (event) => {
    event.preventDefault();
    console.log(event.target.elements);
  };

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
            <Select form="new-slave" name="type" options={types} />
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
