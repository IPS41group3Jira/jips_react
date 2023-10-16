import "./Input.css"
import { useState } from "react";

export default function Input({ className, value, onChange, ...attrs }) {

	const [val, setVal] = useState(value || null);

	const handleChange = (event) => {
		if (typeof onChange == 'function') onChange(event);
		setVal(event.target.value);
	}

	className = `input ${className || ''}`;
	return <input className={className} value={ val } {...attrs} onChange={handleChange}/>;
}