import "./Input.css"
import {forwardRef, useImperativeHandle, useState} from "react";

 const Input = forwardRef(({ className, value, onChange, onBlur, ...attrs }, ref) => {

	const [val, setVal] = useState(value || null);

	const handleChange = (event) => {
		if (typeof onChange == 'function') onChange(event);
		setVal(event.target.value)
	}
	useImperativeHandle(ref, () => ({
		clear: () => setVal('')
	}))
	className = `input ${className || ''}`;
	return <input className={className} value={ val } {...attrs} onBlur={onBlur} onChange={handleChange}/>;
});
export default Input;