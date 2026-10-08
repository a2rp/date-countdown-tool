import { FiClock, FiTrash2 } from "react-icons/fi";
import { formatEventDate, getTimeDifference } from "../../../utils/events.js";
import styles from "./styles.module.css";

const EventCard = ({ event, now, selected, onSelect, onDelete }) => {
  const difference = getTimeDifference(event.dateTime, now);
  const units = [
    { label: "DAYS", value: difference.days },
    { label: "HRS", value: difference.hours },
    { label: "MIN", value: difference.minutes },
    { label: "SEC", value: difference.seconds },
  ];

  return (
    <article className={`${styles.card} ${selected ? styles.selected : ""} ${difference.isPast ? styles.past : ""}`}>
      <button className={styles.selectButton} type="button" aria-pressed={selected} aria-label={`Show countdown for ${event.name}`} onClick={() => onSelect(event.id)}>
        <span className={styles.cardTop}><span className={styles.status}><i />{difference.isPast ? "ELAPSED" : "COUNTING DOWN"}</span><time dateTime={event.dateTime}>{formatEventDate(event.dateTime)}</time></span>
        <strong className={styles.eventName}>{event.name}</strong>
        <span className={styles.timer}>{units.map(({ label, value }) => <span key={label}><b>{String(value).padStart(2, "0")}</b><small>{label}</small></span>)}</span>
        <span className={styles.cardBottom}><span><FiClock aria-hidden="true" /> {difference.isPast ? "Time since this date" : "Time remaining"}</span><span className={styles.openHint}>View timer</span></span>
      </button>
      <button className={styles.deleteButton} type="button" aria-label={`Delete ${event.name}`} onClick={() => onDelete(event)}><FiTrash2 aria-hidden="true" /></button>
    </article>
  );
};

export default EventCard;
