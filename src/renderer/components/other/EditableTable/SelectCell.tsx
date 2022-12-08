interface SelectCellProps {
  options: {
    id: number;
    option: string;
  }[];
}

export const SelectCell = ({ options }: SelectCellProps) => {
  const optionsList = options.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {option.option}
      </option>
    );
  });

  return (
    <tr>
      <select>{optionsList}</select>
    </tr>
  );
};
