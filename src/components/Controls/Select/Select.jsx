import React, { useState } from 'react';

import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

import './Select.css';
import './../Controls.css';

function Select({ children, labelBefore, value, onChange, className, ...attrs }) {

	const [isOpen, setIsOpen] = useState(false);
	const [val, setVal] = useState(value);

	const toggleSelect = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (optionValue, optionLabel) => {
		if(typeof onChange === 'function')
			onChange(optionValue, optionLabel);

		setVal(optionLabel);
		setIsOpen(false);
	};

	return (
		<div className={`select ${className}  ${isOpen ? 'open' : ''}`} { ...attrs }>
			<div className="select__header" onClick={toggleSelect}>
				{ labelBefore && <span className="select__label">{labelBefore}</span> }
				<span className="select__current-value">{val}</span>
				{ isOpen ? (<MdKeyboardArrowUp className="icon_arrow" />) : (<MdKeyboardArrowDown className="icon_arrow" />) }
			</div>
			{
				isOpen && (
					<ul className="select__options">
						{
							React.Children.map(children, (child) =>
								React.cloneElement(child, {
									onClick: () => handleOptionClick(child.props.value, child.props.children),
								})
							)
						}
					</ul>
				)
			}
		</div>
	);
}

export default Select;
