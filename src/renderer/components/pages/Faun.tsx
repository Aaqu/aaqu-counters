import { ChangeEvent, useEffect, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CellContext } from '@tanstack/table-core';

// const DATA = {
//   deviceTypes: ['D204MB', 'other'],
//   converters: ['TCP', 'COM'],
//   columns: ['Name', 'Device Type', 'Converter', 'Device address'],
//   rows: [
//     { name: 'device1', deviceType: 'D204MB', converter: 'TCP', address: '4' },
//     { name: 'device2', deviceType: 'D204MB', converter: 'TCP', address: '5' },
//   ],
// };
//
// interface ElementProps {
//   value: string;
// }

// const Element = ({ value }: ElementProps) => {
//   const text = useRef(value);
//
//   const handleChange = (evt: ContentEditableEvent) => {
//     text.current = evt.target.value;
//   };
//
//   const handleBlur = () => {
//     console.log(text.current);
//   };
//
//   return (
//     <ContentEditable
//       className="w-full"
//       html={text.current}
//       onBlur={handleBlur}
//       onChange={handleChange}
//     />
//   );
// };

type Device = {
  name: string;
  type: string;
  converter: string;
  address: number;
};

const DATA: Device[] = [
  {
    name: 'device1',
    type: 'D204MB',
    converter: 'TCP',
    address: 2,
  },
  {
    name: 'device2',
    type: 'D204MB',
    converter: 'TCP',
    address: 4,
  },
  {
    name: 'device3',
    type: 'D204MB',
    converter: 'TCP',
    address: 3,
  },
];

interface EditCellProps {
  value: string;
}
const EditCell = ({ value }: EditCellProps) => {
  const [cell, setCell] = useState({
    value,
    edited: false,
  });

  useEffect(() => {
    if (cell.edited) {
      console.log('edited');
    }
  }, [cell.edited]);
  //
  // const onChange = (e: ContentEditableEvent) => {
  //   // setValue(e.target.value);
  // };

  const onBlur = (e) => {
    setCell({
      value: e.target.innerText.trim(),
      edited: true,
    });
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        setCell((old) => ({
          value: old.value,
          edited: false,
        }));
        break;
      case 'Enter':
        e.target.blur();
        break;
      default:
    }
  };

  return (
    <ContentEditable
      html={(value && value.toString()) || ''}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};

const columns: ColumnDef<Device>[] = [
  {
    accessorKey: 'name',
    cell: (info) => <EditCell value={String(info.getValue())} />,
  },
  {
    accessorKey: 'type',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'converter',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'address',
    cell: (info) => info.getValue(),
  },
];
export const Faun = () => {
  const [data, setData] = useState(() => [...DATA]);

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="grid flex-col justify-items-center">
      <div className="pl-2 py-2 w-full border-b border-stone-300 rounded-tr-lg">
        Faun - add device
      </div>
      <table className="mt-2 w-[98%] text-left text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-y border-stone-300">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="p-1 border-x border-stone-300 first:border-none last:border-none"
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ position: 'relative', width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanResize() && (
                      // TODO resolve this problem
                      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className="border-y border-stone-300" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className="p-1 border-x border-stone-300 first:border-none last:border-none"
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
