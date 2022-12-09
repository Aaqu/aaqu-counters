import { Table } from '../other/EditableTable/Table';
import { Content } from '../other/Content';
import { ContentTitle } from '../other/ContentTitle';

const tableColumns = [
  {
    column: 'id',
    name: 'id',
    width: 'w-16',
  },
  {
    column: 'name',
    name: 'Name',
    type: 'editable',
  },
  {
    column: 'typeId',
    name: 'Device',
    type: 'select',
    selectData: 'typeIds',
    width: 'w-36',
  },
  {
    column: 'converterId',
    name: 'Converter',
    type: 'select',
    selectData: 'converterIds',
    width: 'w-36',
  },
  {
    column: 'address',
    name: 'Address',
    type: 'min-max',
    min: 1,
    max: 255,
    width: 'w-8',
  },
];
const tableValues = {
  typeIds: [
    {
      id: 1,
      option: 'D204MB',
    },
  ],
  converterIds: [
    {
      id: 1,
      option: '192.168.1.7:500',
    },
    {
      id: 2,
      option: '192.168.1.8:500',
    },
  ],
  tableData: [
    {
      id: 1,
      name: 'device-1',
      typeId: 1,
      converterId: 2,
      address: 1,
    },
    {
      id: 2,
      name: 'device-2',
      typeId: 1,
      converterId: 2,
      address: 2,
    },
  ],
};

export const Faun = () => {
  return (
    <Content>
      <ContentTitle>Faun - add device</ContentTitle>
      <Table options={tableColumns} data={tableValues} />
    </Content>
  );
};
