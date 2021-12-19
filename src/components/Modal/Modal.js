import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCloseModal]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={styles.Backdrop} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
