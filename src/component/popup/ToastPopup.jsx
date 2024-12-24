import { useState } from "react";
import "./ToastPopup.css";

const ToastPopup = ({ message, onConfirm }) => {
  const [visible, setVisible] = useState(true);

  const handleConfirm = () => {
    setVisible(false);
    if (onConfirm) onConfirm();
  };

  return visible ? (
    <div>
      <div className="alret-container" />
      <div className="toast">
        <p>{message}</p>
        <button className="toast-confirm-btn" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  ) : null;
};

export default ToastPopup;
