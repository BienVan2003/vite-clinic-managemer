import axios from 'axios';
import React from 'react';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            // Gọi API ở đây
            const response = await axios.get('YOUR_API_URL');
            // Xử lý kết quả ở đây
            onConfirm(response.data);
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error('Error:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={handleConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
