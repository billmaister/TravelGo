import styles from './Modal.module.css';

const Modal = ({ children, open, onClose }) => {
  if (!open) {
    return null;
  }
  return (
    <div onClick={onClose} className={styles.overlay}>
      <div onClick={(e) => {e.stopPropagation()}} className={styles.modalContainer}>
        <p className={styles.closeBtn} onClick={onClose}>
            X
        </p>
        <div className={styles.content}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;