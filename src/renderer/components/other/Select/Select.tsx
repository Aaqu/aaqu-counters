import styles from './Select.module.css';

export const Select = (props) => {
  // eslint-disable-next-line react/prop-types
  const { options, name, form } = props;

  const createOptions = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    options: { id: number; value: string; label: string }[]
  ) => {
    // eslint-disable-next-line react/prop-types
    return options.map(({ id, value, label }) => {
      return (
        <option key={id} value={value}>
          {label}
        </option>
      );
    });
  };

  return (
    <select className={styles.select} name={name} form={form} required>
      <option value="">none</option>
      {createOptions(options)}
    </select>
  );
};
