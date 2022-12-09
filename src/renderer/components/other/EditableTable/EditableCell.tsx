/* eslint-disable jsx-a11y/no-autofocus */

import {
  useState,
  useRef,
  useEffect,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';

interface EditableCellProps {
  defaultValue: string;
}

export const EditableCell = ({ defaultValue }: EditableCellProps) => {
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(defaultValue);
  // const [width, setWidth] = useState(50);
  const spanRef = useRef<HTMLInputElement>();
  const inputRef = useRef<HTMLInputElement>();

  // useEffect(() => {
  //   if (!editable) {
  //     return;
  //   }
  //   // const x = inputRef.current.offsetWidth;
  //   // if (x < 150) {
  //   //   setWidth(x);
  //   // }
  // }, [content, editable]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const initEditable = () => {
    setEditable(true);
  };

  useEffect(() => {
    const spanValue = spanRef.current;
    const inputValue = inputRef.current;

    spanValue?.addEventListener('click', initEditable);
    if (editable) {
      inputValue?.select();
    }
    return () => {
      spanValue?.removeEventListener('click', initEditable);
    };
  }, [editable]);

  return (
    <td>
      {editable ? (
        <input
          ref={inputRef}
          type="text"
          className="width-"
          // style={{ width }}
          autoFocus
          onChange={changeHandler}
          defaultValue={content}
        />
      ) : (
        <span ref={spanRef}>{content}</span>
      )}
    </td>
  );

  // return (
  //   <>
  //     {editable ? (
  //       <form onSubmit={handleSubmit}>
  //         <input type="text" name="newText" autoFocus />
  //       </form>
  //     ) : (
  //       <div onClick={handleClick}>{text}</div>
  //     )}
  //   </>
  // );
};
