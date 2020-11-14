import React from 'react';

const Field = ({type, name, id, htmlFor, value, onChange, title}) => {
	return (
		<p>
			<label htmlFor={htmlFor}>{title}</label>
			<input
				type={type}
				name={name}
				id={id}
				value={value || ''}
				onChange={onChange} />
		</p>
	)
}

export default Field;