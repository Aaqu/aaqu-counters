import { useEffect, useRef, useState } from 'react';
import styles from './TcpPort.module.css';
import { Input } from './Input';

interface Values {
  value: string;
  max: string;
  min: string;
}

export const TcpPort = (props: { form: string; name: string }) => {
  const { form, name } = props;
  const inputRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState('0.0.0.0:0');

  const updateValue = () => {
    const { a, b, c, d, port } = inputRef.current as typeof inputRef.current & {
      a: Values;
      b: Values;
      c: Values;
      d: Values;
      port: Values;
    };

    const ip = [a, b, c, d, port].map((el) => {
      if (Number(el.value) > Number(el.max)) return el.max;
      if (Number(el.value) < Number(el.min)) return el.min;
      return Number(el.value);
    });

    const string = `${ip[0]}.${ip[1]}.${ip[2]}.${ip[3]}:${ip[4]}`;
    setValue(string);
  };

  useEffect(() => {
    updateValue();
  }, []);

  return (
    <>
      <input
        type="text"
        form={form}
        name={name}
        value={value}
        style={{ display: 'none' }}
      />
      <form className={styles.tcpPort} ref={inputRef} onChange={updateValue}>
        <Input name="a" min="0" max="255" value="192" />
        .
        <Input name="b" min="0" max="255" value="168" />
        .
        <Input name="c" min="0" max="255" value="1" />
        .
        <Input name="d" min="0" max="255" value="8" />
        :
        <Input name="port" min="1" max="65535" value="26" />
      </form>
    </>
  );
};
