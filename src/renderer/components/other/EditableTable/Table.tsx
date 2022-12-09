import { useEffect, useRef } from 'react';
import { SelectCell } from './SelectCell';
import { EditableCell } from './EditableCell';

interface TableProps {
  data: {
    typeIds: {
      id: number;
      option: string;
    }[];
    converterIds: {
      id: number;
      option: string;
    }[];
    tableData: {
      id: number;
      name: string;
      typeId: number;
      converterId: number;
      address: number;
    }[];
  };
  options: {
    column: string;
    width?: string;
    name: string;
    type?: 'editable' | 'select' | 'min-max';
    selectData?: string;
    min?: number;
    max?: number;
  }[];
}

export const Table = ({ data, options }: TableProps) => {
  const tableRef = useRef<HTMLTableElement>();

  useEffect(() => {
    if (!tableRef.current) {
      return;
    }

    console.log(tableRef.current.offsetWidth);
  });

  return (
    <table className="w-full" ref={tableRef}>
      <thead>
        <tr>
          {options.map((column) => {
            return (
              <th key={column.column} className={column.width}>
                {column.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.tableData.map((row, index) => {
          const columns = Object.entries(row);
          const tableRow = columns.map(([column, value]) => {
            const columnParams = options.find(
              (rowParams) => rowParams.column === column
            );
            let cell = <td>null</td>;
            if (columnParams?.type === undefined) {
              cell = <td>{index + 1}</td>;
            }
            if (columnParams?.type === 'editable') {
              cell = <EditableCell defaultValue={row.name} />;
            }
            if (columnParams?.type === 'select') {
              cell = (
                <SelectCell
                  options={data[columnParams.selectData]}
                  selected={row.converterId}
                />
              );
            }
            if (columnParams?.type === 'min-max') {
              cell = (
                <td>
                  <input
                    className="w-full"
                    type="number"
                    min={columnParams.min}
                    max={columnParams.max}
                    defaultValue={value}
                  />
                </td>
              );
            }
            return cell;
          });
          return <tr>{tableRow}</tr>;
        })}
      </tbody>
    </table>
  );
};
