/* eslint-disable jsx-a11y/no-autofocus */
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface EditableCellProps {
  value: string;
}
export const EditableCellOld = ({ value: initialValue }: EditableCellProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState({
    value: initialValue,
    editable: false,
  });

  const initEditable = () => {
    setState((old) => ({
      ...old,
      editable: true,
    }));
  };

  useEffect(() => {
    const textElement = textRef.current;
    const inputElement = inputRef.current;
    textElement?.addEventListener('click', initEditable);

    if (state.editable) {
      inputElement?.select();
    }
    return () => {
      textElement?.removeEventListener('click', initEditable);
    };
  }, [state.editable]);

  const handleInputOnBlur = () => {
    if (inputRef.current) {
      setState({
        value: inputRef.current.value,
        editable: false,
      });
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        setState((old) => ({
          ...old,
          editable: false,
        }));
        break;
      case 'Enter':
        e.currentTarget.blur();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {state.editable ? (
        <input
          className="w-full"
          ref={inputRef}
          type="text"
          defaultValue={state.value}
          onBlur={handleInputOnBlur}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      ) : (
        <div className="w-full" ref={textRef}>
          {state.value}
        </div>
      )}
    </>
  );
};
