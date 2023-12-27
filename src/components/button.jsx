import React, { useState } from 'react';

const Button = (props) => {
	const [color, setColor] = useState('blue');

	const handleClick = () => color === 'red' ? setColor('blue') : setColor('red');

	return (
		<button style={{ backgroundColor: color }} onClick={handleClick}>
			{props.text}
		</button>
	);
};

export default Button;
