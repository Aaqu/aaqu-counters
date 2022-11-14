import { EditableCell } from '../other/EditableTable/EditableCell';

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

export const Faun = () => {
  return (
    <div className="grid flex-col justify-items-center">
      <div className="pl-2 py-2 w-full border-b border-stone-300 rounded-tr-lg">
        Faun - add device
      </div>

      <EditableCell value="test1" />
      <EditableCell value="test2" />
      <EditableCell value="test3" />
    </div>
  );
};
