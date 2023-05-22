import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
	return (
		<div className="modal-container">
			<div className="modal-content">
				<p className="modal-message">{message}</p>
				<div className="modal-buttons">
					<button className="modal-confirm-button" onClick={onConfirm}>
						Confirm
					</button>
					<button className="modal-cancel-button" onClick={onCancel}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
