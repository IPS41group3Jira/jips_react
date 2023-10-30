import './Input.css'
import {useState} from "react";

export default function Textarea({ className, value, onChange, ...attrs}){
    const [val, setVal] = useState(value || null);

    const handleChange = (event) => {
        if (typeof onChange == 'function') onChange(event);
        setVal(event.target.value);
    }

    className = `textarea ${className || ''}`;
    return <textarea className={className} value={val} {...attrs} onChange={handleChange}/>;
}