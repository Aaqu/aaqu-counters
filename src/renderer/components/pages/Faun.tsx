import { useEffect, useState } from 'react';
import { EditableTable } from '../other/EditableTable/EditableTable';

// const DATA = [
//   {
//     name: 'device1',
//     type: 'D204MB',
//     converter: 'TCP',
//     address: 2,
//   },
//   {
//     name: 'device2',
//     type: 'D204MB',
//     converter: 'TCP',
//     address: 4,
//   },
//   {
//     name: 'device3',
//     type: 'D204MB',
//     converter: 'TCP',
//     address: 3,
//   },
// ];

type FaunProps = {
  id?: number;
  name: string;
  type: string;
  converter: string;
  address: number;
};

export const Faun = () => {
  const [data, setData] = useState<FaunProps[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('faun-list');
    window.electron.ipcRenderer.once('faun-list', (args) => {
      console.log(args);
      setData(args);
    });
  }, []);

  return (
    <div className="grid flex-col justify-items-center">
      <div className="pl-2 py-2 w-full border-b border-stone-300 rounded-tr-lg">
        Faun - add device
      </div>

      <EditableTable data={data} />
    </div>
  );
};
