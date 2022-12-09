interface SelectCellProps {
  options: {
    id: number;
    option: string;
  }[];
  selected: number;
}

export const SelectCell = ({ options, selected }: SelectCellProps) => {
  const optionsList = options.map((option) => {
    return (
      <option
        key={option.id}
        value={option.id}
        selected={option.id === selected}
      >
        {option.option}
      </option>
    );
  });

  return (
    <td>
      <select className="w-full">{optionsList}</select>
    </td>
  );
};
