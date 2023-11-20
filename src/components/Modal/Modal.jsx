import React, { useState } from 'react';
import {AiOutlineClose} from "react-icons/ai";
import './Modal.css';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="ui-modal-wrapper" >
            <div className='ui-modal'>
                <div className='ui-modal__header'>
                    <button onClick={onClose}><AiOutlineClose/></button>
                </div>
                <div className='ui-modal__content'>
                    {children}
                </div>
                <div className='ui-modal__footer'></div>
            </div>
        </div>
    );
};