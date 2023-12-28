import React, { useState } from 'react';

const Button = (props) => {
  const defaultColor = ['rgb(25, 118, 210)', 'rgb(149, 150, 151)'];
  const [color, setColor] = useState(defaultColor[0]);

  const handleClick = () => {
    const newColor = color === defaultColor[1] ? defaultColor[0] : defaultColor[1];
    setColor(newColor);
  };

  return (
    <button className="selectBtn" style={{ backgroundColor: color }} onClick={handleClick}>
	    {props.text}
    </button>
  );
};

export default Button;
