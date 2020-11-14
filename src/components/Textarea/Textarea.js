import React from 'react';

const Textarea = ({name, id, value, onChange,htmlFor, title }) => {
	return (
		<p>
			<label htmlFor={htmlFor}>{title}</label>
			<textarea
				type='textarea'
				name={name}
				id={id}
				value={value || ''}
					onChange={onChange} />
		</p>
	)
}

export default Textarea;