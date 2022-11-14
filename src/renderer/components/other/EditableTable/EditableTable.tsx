// interface TableContentEditableProps {
//   data: [];
// }

import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { EditableCell } from './EditableCell';

const columns: ColumnDef<Device>[] = [
  {
    accessorKey: 'name',
    cell: (info) => <EditableCell value={String(info.getValue())} />,
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

export const EditableTable = () => {
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
    // <table className="mt-2 w-[98%] text-left text-sm">
    //   <thead>
    //   {table.getHeaderGroups().map((headerGroup) => (
    //     <tr key={headerGroup.id} className="border-y border-stone-300">
    //       {headerGroup.headers.map((header) => {
    //         return (
    //           <th
    //             className="p-1 border-x border-stone-300 first:border-none last:border-none"
    //             key={header.id}
    //             colSpan={header.colSpan}
    //             style={{ position: 'relative', width: header.getSize() }}
    //           >
    //             {header.isPlaceholder
    //               ? null
    //               : flexRender(
    //                 header.column.columnDef.header,
    //                 header.getContext()
    //               )}
    //             {header.column.getCanResize() && (
    //               // TODO resolve this problem
    //               // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    //               <div
    //                 onMouseDown={header.getResizeHandler()}
    //                 onTouchStart={header.getResizeHandler()}
    //                 className={`resizer ${
    //                   header.column.getIsResizing() ? 'isResizing' : ''
    //                 }`}
    //               />
    //             )}
    //           </th>
    //         );
    //       })}
    //     </tr>
    //   ))}
    //   </thead>
    //   <tbody>
    //   {table.getRowModel().rows.map((row) => {
    //     return (
    //       <tr className="border-y border-stone-300" key={row.id}>
    //         {row.getVisibleCells().map((cell) => {
    //           return (
    //             <td
    //               className="p-1 border-x border-stone-300 first:border-none last:border-none"
    //               key={cell.id}
    //               style={{ width: cell.column.getSize() }}
    //             >
    //               {flexRender(
    //                 cell.column.columnDef.cell,
    //                 cell.getContext()
    //               )}
    //             </td>
    //           );
    //         })}
    //       </tr>
    //     );
    //   })}
    //   </tbody>
    // </table>
    <div />
  );
};
