/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';

const DATA = {
  deviceTypes: ['D204MB', 'other'],
  converters: ['TCP', 'COM'],
  columns: ['Name', 'Device Type', 'Converter', 'Device address'],
  rows: [
    { name: 'device1', deviceType: 'D204MB', converter: 'TCP', address: '4' },
    { name: 'device2', deviceType: 'D204MB', converter: 'TCP', address: '5' },
  ],
};

interface ElementProps {
  value: string;
}

const Element = ({ value }: ElementProps) => {
  const [active, setActive] = useState(false);

  const activeField = () => {
    setActive(true);
  };

  const disableField = () => {
    setActive(false);
  };

  if (active) {
    return (
      <input
        className="w-full"
        type="text"
        defaultValue={value}
        onBlur={disableField}
        autoFocus
      />
    );
  }

  return (
    <button
      className="w-full text-left pl-1"
      type="button"
      onClick={activeField}
    >
      {value}
    </button>
  );
};

export const Faun = () => {
  const [data, setData] = useState(DATA);

  return (
    <>
      <div className="pl-2 py-2 border-b bg-slate-50 rounded-tr-lg">Faun</div>
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-slate-50">
          <tr className="bg-zinc-400">
            {data.columns.map((column) => {
              return <th className="pl-1">{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => {
            return (
              <tr className="even:bg-zinc-300">
                {Object.values(row).map((value) => {
                  return (
                    <td className="border-r border-b w-1/4">
                      <Element value={value} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
