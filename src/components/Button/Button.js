import React from 'react';

const Button = ({title, onClick, type='button'}) => {
	return (
		<button onClick= {onClick} type={type}>{title}</button>
	)
}

export default Button;