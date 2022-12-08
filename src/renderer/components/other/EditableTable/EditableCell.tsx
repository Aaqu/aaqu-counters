// import { useState, useRef, useEffect } from "react";

// export const Table = () => {
//   const [content, setContent] = useState("device1");
//   const [width, setWidth] = useState(50);
//   const span = useRef();

//   useEffect(() => {
//     const x = span.current.offsetWidth;
//     if (x < 150) {
//       setWidth(x);
//     }
//   }, [content]);

//   const changeHandler = (evt) => {
//     setContent(evt.target.value);
//   };

//   return (
//     <div>
//       <input
//         ref={span}
//         type="text"
//         style={{ width }}
//         autoFocus
//         onChange={changeHandler}
//         defaultValue={content}
//       />
//     </div>
//   );

//   // return (
//   //   <>
//   //     {editable ? (
//   //       <form onSubmit={handleSubmit}>
//   //         <input type="text" name="newText" autoFocus />
//   //       </form>
//   //     ) : (
//   //       <div onClick={handleClick}>{text}</div>
//   //     )}
//   //   </>
//   // );
// };
