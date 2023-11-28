import React, { useState } from 'react';
import {AiOutlineClose} from "react-icons/ai";
import './Modal.css';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    const onCloseHandle = (e) => {
        document.body.style.overflow = null;
        if (typeof onClose === 'function') {
            onClose(e);
        }
    }

    document.body.style.overflow = 'hidden';

    return (
        <div className="ui-modal-wrapper" >
            <div className='ui-modal'>
                <div className='ui-modal__header'>
                    <button onClick={onCloseHandle}><AiOutlineClose/></button>
                </div>
                <div className='ui-modal__content'>
                    {children}
                </div>
                <div className='ui-modal__footer'></div>
            </div>
        </div>
    );
};