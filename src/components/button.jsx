import React, { useState, useContext } from 'react';
import { AccidentTypeContext } from '../App.jsx';

// const Button = ({ data, i, j }) => {
//   const [accidentInfo, setAccidentInfo] = useContext(AccidentTypeContext);
//   return (
//     <div className='selectBtn'>
//       <label>
//         <input type="checkbox" checked={data.checked} onChange={() => {
//           const newChecked = !data.checked;
//           const newAccidentInfo = [...accidentInfo];
//           newAccidentInfo[i].types[j].checked = newChecked;
//           setAccidentInfo(newAccidentInfo);
//         }} />
//         {data.type}
//       </label>
//     </div>
//   );
// }

const Button = ({ data, i, j }) => {
  const [accidentInfo, setAccidentInfo] = useContext(AccidentTypeContext);

  return (
    <div className={`selectBtn ${data.checked ? 'checked' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={data.checked}
          onChange={() => {
            const newChecked = !data.checked;
            const newAccidentInfo = [...accidentInfo];
            newAccidentInfo[i].types[j].checked = newChecked;
            setAccidentInfo(newAccidentInfo);
          }}
        />
        {data.type}
      </label>
    </div>
  );
};


export default Button;
