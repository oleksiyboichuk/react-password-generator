import React from 'react';
import './Modal.css'; // Стилі для модального вікна (додайте стилі відповідно до вашого дизайну)

function Modal({ text }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Modal;