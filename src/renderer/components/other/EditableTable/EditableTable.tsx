import { useState } from 'react';

import { EditableCell } from './EditableCell';

type Device = {
  name: string;
  type: string;
  converter: string;
  address: number;
};

const columns = [
  {
    columnKey: 'name',
    columnName: 'Name',
    columnType: 'editableCell',
  },
  {
    columnKey: 'type',
    columnName: 'Type',
    columnType: 'editableCell',
  },
  {
    columnKey: 'converter',
    columnName: 'Converter',
    columnType: 'editableCell',
  },
  {
    columnKey: 'address',
    columnName: 'Address',
    columnType: 'editableCell',
  },
];

interface EditableTableProps {
  data: Device[];
}

export const EditableTable = ({ data: defaultData }: EditableTableProps) => {
  const [data, setData] = useState(() => [...defaultData]);

  const handleAddRow = () => {
    const newRow = {
      name: 'new-device',
      type: '?',
      converter: '?',
      address: 0,
    };

    setData((old) => [...old, newRow]);
  };

  return (
    <table className="mt-2 w-[98%] text-left text-sm">
      <thead>
        <tr className="border-y border-stone-300">
          <th className="p-1 w-20 border-x border-stone-300 first:border-none last:border-none">
            .
          </th>
          {columns.map(({ columnName, columnKey }) => (
            <th
              className="p-1 border-x border-stone-300 first:border-none last:border-none"
              key={columnKey}
            >
              {columnName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr className="border-y border-stone-300">
            <td className="p-1 border-x border-stone-300 first:border-none last:border-none">
              {index}
            </td>
            {Object.values(row).map((value) => (
              <td className="p-1 border-x border-stone-300 first:border-none last:border-none">
                <EditableCell value={String(value)} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border-y border-stone-300">
          <td className="p-1 border-x border-stone-300 first:border-none last:border-none text-slate-500">
            <button className="w-8" type="button" onClick={handleAddRow}>
              +
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
