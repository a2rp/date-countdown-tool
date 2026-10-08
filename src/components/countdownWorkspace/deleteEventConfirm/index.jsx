import { useEffect, useRef } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import styles from "./styles.module.css";

const DeleteEventConfirm = ({ event, onCancel, onConfirm }) => {
  const cancelRef = useRef(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const handleKeyDown = (keyEvent) => {
      if (keyEvent.key === "Escape") onCancel();
      if (keyEvent.key === "Tab" && keyEvent.shiftKey && document.activeElement === cancelRef.current) {
        keyEvent.preventDefault();
        confirmRef.current?.focus();
      } else if (keyEvent.key === "Tab" && !keyEvent.shiftKey && document.activeElement === confirmRef.current) {
        keyEvent.preventDefault();
        cancelRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className={styles.overlay} onMouseDown={(eventClick) => { if (eventClick.target === eventClick.currentTarget) onCancel(); }}>
      <section className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="delete-event-title" aria-describedby="delete-event-description">
        <span className={styles.icon}><FiAlertTriangle aria-hidden="true" /></span>
        <h2 id="delete-event-title">Remove this date?</h2>
        <p id="delete-event-description"><b>{event.name}</b> will be removed from the saved countdown list on this device.</p>
        <div className={styles.actions}><button ref={cancelRef} type="button" onClick={onCancel}>Keep event</button><button ref={confirmRef} type="button" onClick={onConfirm}>Remove event</button></div>
      </section>
    </div>
  );
};

export default DeleteEventConfirm;
