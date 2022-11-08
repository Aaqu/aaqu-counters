import { ChangeEvent, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

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
  const text = useRef(value);

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };

  return (
    <ContentEditable
      className="w-full"
      html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

export const Faun = () => {
  const [data, setData] = useState(DATA);

  return (
    <div className="grid flex-col justify-items-center">
      <div className="pl-2 py-2 w-full border-b border-stone-300 rounded-tr-lg">
        Faun - add device
      </div>
      <table className="mt-2 w-[98%] text-left text-sm">
        <thead>
          <tr className="border-y border-stone-300">
            {data.columns.map((column) => {
              return (
                <th className="p-1 border-x border-stone-300 first:border-none last:border-none">
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => {
            return (
              <tr className="border-y border-stone-300">
                {Object.values(row).map((value) => {
                  return (
                    <td className="p-1 border-x border-stone-300 first:border-none last:border-none w-1/4">
                      <Element value={value} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr className="border-y border-stone-300">
            <td className="p-1 border-x border-stone-300 first:border-none last:border-none">
              <button className="w-8" type="button" title="Add row">
                ...
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
