import { useState } from "react";
import { FiPlus, FiZap } from "react-icons/fi";
import { eventLimit, eventNameLimit, getEventPreset, validateEvent } from "../../../utils/events.js";
import styles from "./styles.module.css";

const EventForm = ({ eventCount, onAdd }) => {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(() => getEventPreset("tomorrow").dateTime);
  const [error, setError] = useState("");
  const disabled = eventCount >= eventLimit;

  const applyPreset = (preset) => {
    const values = getEventPreset(preset);
    setName(values.name);
    setDateTime(values.dateTime);
    setError("");
  };

  const submit = (event) => {
    event.preventDefault();
    try {
      onAdd(validateEvent({ name, dateTime }));
      setName("");
      setDateTime(getEventPreset("tomorrow").dateTime);
      setError("");
    } catch (formError) {
      setError(formError.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.heading}><span className={styles.icon}><FiZap aria-hidden="true" /></span><div><h2>Add a date</h2><p>Keep an important moment close.</p></div></div>
      <label htmlFor="event-name">Event name</label>
      <input id="event-name" value={name} maxLength={eventNameLimit} onChange={(event) => setName(event.target.value)} placeholder="A trip, launch, or birthday" required disabled={disabled} />
      <label htmlFor="event-date">Date and local time</label>
      <input id="event-date" type="datetime-local" value={dateTime} onChange={(event) => setDateTime(event.target.value)} required disabled={disabled} />
      <p className={styles.timeNote}>Uses the time zone set on this device.</p>
      <div className={styles.presets} aria-label="Quick date presets">
        <button type="button" onClick={() => applyPreset("tomorrow")} disabled={disabled}>Tomorrow</button>
        <button type="button" onClick={() => applyPreset("newYear")} disabled={disabled}>New Year</button>
        <button type="button" onClick={() => applyPreset("month")} disabled={disabled}>One month</button>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {disabled && <p className={styles.error}>The event list is at its {eventLimit} item limit.</p>}
      <button className={styles.submitButton} type="submit" disabled={disabled}><FiPlus aria-hidden="true" /> Add countdown</button>
    </form>
  );
};

export default EventForm;
