import { EditableTable } from '../other/EditableTable/EditableTable';

const DATA = [
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

export const Faun = () => {
  return (
    <div className="grid flex-col justify-items-center">
      <div className="pl-2 py-2 w-full border-b border-stone-300 rounded-tr-lg">
        Faun - add device
      </div>

      <EditableTable data={DATA} />
    </div>
  );
};
