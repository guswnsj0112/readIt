import "./Modal.css";
import FetchBookAPI from "./FetchBookAPI";
export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <button onClick={onClose} className="modal-close"></button>
        <FetchBookAPI />
      </div>
    </div>
  );
}
