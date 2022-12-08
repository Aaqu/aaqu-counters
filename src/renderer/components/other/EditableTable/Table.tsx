import { SelectCell } from './SelectCell';

interface TableProps {
  data: {
    deviceTypes: {
      id: number;
      option: string;
    }[];
    converters: {
      id: number;
      option: string;
    }[];
  };
  options: {
    column: string;
    name: string;
    type?: 'editable' | 'select' | 'min-max';
    min?: number;
    max?: number;
  }[];
}

export const Table = ({ data, options }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {options.map((column) => {
            return <th>{column.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {options.map((column, index) => {
            let cell = <tr>0</tr>;
            switch (column.type) {
              case 'editable':
                cell = <td>a</td>;
                break;
              case 'select':
                cell = <td>b</td>;
                break;
              case 'min-max':
                cell = <td>a</td>;
                break;
              default:
                cell = <td>{index}</td>;
            }
            return cell;
          })}
        </tr>
      </tbody>
    </table>
  );
};
