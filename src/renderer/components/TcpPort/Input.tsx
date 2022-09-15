import { useState } from 'react';

interface InputInterface {
  name: string;
  min: string;
  max: string;
  value: string;
}

export const Input = (props: InputInterface) => {
  const { name, min, max, value } = props;

  const [outputValue, setOutputValue] = useState(value);

  const handleChange = (event: {
    target: { value: string; min: string; max: string };
  }) => {
    const currentValue = [event.target].map((el) => {
      if (el.value[0] === '0') return Number(el.value);
      if (Number(el.value) > Number(el.max)) return el.max;
      if (Number(el.value) < Number(el.min)) return el.min;
      return Number(el.value);
    });
    setOutputValue(currentValue.toString());
  };

  return (
    <input
      type="number"
      name={name}
      value={outputValue}
      min={min}
      max={max}
      onChange={handleChange}
    />
  );
};
