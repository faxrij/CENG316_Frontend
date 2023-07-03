import React from "react";
import "./ConfirmationModal.css";
import { Button } from './Button';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
	return (
		<div className="modal-container">
			<div className="modal-content">
				<p className="modal-message">{message}</p>
				<div className="modal-buttons">
					<Button buttonStyle="btn--red" className="modal-confirm-button" onClick={onConfirm}>
						Confirm
					</Button>
					<Button className="modal-cancel-button" onClick={onCancel}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
