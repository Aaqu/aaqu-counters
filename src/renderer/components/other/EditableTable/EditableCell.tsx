/* eslint-disable jsx-a11y/no-autofocus */

import { useEffect, useRef, useState } from 'react';

interface EditableCellProps {
  initialValue: string;
}
export const EditableCell = ({ initialValue }: EditableCellProps) => {
  const textRef = useRef(null);
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [editable, setEditble] = useState(false);

  const initEditable = () => {
    setEditble(true);
  };

  useEffect(() => {
    const textElement = textRef.current;
    if (!editable) {
      textElement.addEventListener('dblclick', initEditable);
    }
    return () => {
      textElement.removeEventListener('dblclick', initEditable);
    };
  }, [editable]);

  useEffect(() => {
    if (editable) {
      inputRef.current.select();
    }
  }, [editable]);

  const handleInputOnBlur = (e) => {
    setValue(inputRef.current.value);
    setEditble(false);
  };

  const handleInputKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        setEditble(false);
        break;
      case 'Enter':
        e.target.blur();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {editable ? (
        <input
          ref={inputRef}
          type="text"
          defaultValue={value}
          onBlur={handleInputOnBlur}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      ) : (
        <div ref={textRef}>{value}</div>
      )}
    </>
  );
};
