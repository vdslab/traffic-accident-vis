import React, { useState, useContext } from 'react';
import { AccidentTypeContext } from '../App.jsx';

const Button = ({ data, i, j }) => {
  // console.log(data, i);
  const [accidentInfo, setAccidentInfo] = useContext(AccidentTypeContext);
  return (
    <label>
      <input type="checkbox" className="selectBtn" checked={data.checked} onChange={() => {
        // console.log(data, index);
        const newChecked = !data.checked;
        const newAccidentInfo = [...accidentInfo];
        newAccidentInfo[i].types[j].checked = newChecked;
        // console.log(newAccidentInfo);
        setAccidentInfo(newAccidentInfo);
      }} />
      {data.type}
    </label>
  );
}

export default Button;
