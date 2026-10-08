import { useEffect, useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import DeleteEventConfirm from "./deleteEventConfirm/index.jsx";
import EventCard from "./eventCard/index.jsx";
import EventForm from "./eventForm/index.jsx";
import { eventLimit, eventStorageKey, formatEventDate, getTimeDifference, sortEvents } from "../../utils/events.js";
import styles from "./styles.module.css";

const readEvents = () => {
  try {
    const value = localStorage.getItem(eventStorageKey);
    if (value === null) return [];
    const events = JSON.parse(value);
    return Array.isArray(events) ? events.filter((event) => event && typeof event.id === "string" && typeof event.name === "string" && Number.isFinite(new Date(event.dateTime).getTime())) : [];
  } catch {
    return [];
  }
};

const CountdownWorkspace = () => {
  const [events, setEvents] = useState(readEvents);
  const [selectedId, setSelectedId] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [now, setNow] = useState(() => Date.now());
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState("");
  const sortedEvents = sortEvents(events, now);
  const selectedEvent = events.find((event) => event.id === selectedId) ?? sortedEvents[0] ?? null;
  const selectedDifference = selectedEvent ? getTimeDifference(selectedEvent.dateTime, now) : null;

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const storeEvents = (nextEvents) => {
    setEvents(nextEvents);
    try {
      localStorage.setItem(eventStorageKey, JSON.stringify(nextEvents));
      setStorageError("");
    } catch {
      setStorageError("Browser storage is unavailable. Events will be lost when you leave this tab.");
    }
  };

  const addEvent = ({ name, dateTime }) => {
    if (events.length >= eventLimit) throw new Error(`You can save up to ${eventLimit} events.`);
    const event = { id: globalThis.crypto?.randomUUID?.() ?? `event-${Date.now().toString(36)}`, name, dateTime };
    storeEvents([event, ...events]);
    setSelectedId(event.id);
    setNotice(`“${name}” added to your countdowns.`);
  };

  const removeEvent = () => {
    if (!pendingDelete) return;
    const nextEvents = events.filter((event) => event.id !== pendingDelete.id);
    storeEvents(nextEvents);
    if (selectedId === pendingDelete.id) setSelectedId("");
    setNotice(`“${pendingDelete.name}” removed.`);
    setPendingDelete(null);
  };

  const timeUnits = selectedDifference ? [
    { label: "DAYS", value: selectedDifference.days },
    { label: "HOURS", value: selectedDifference.hours },
    { label: "MINUTES", value: selectedDifference.minutes },
    { label: "SECONDS", value: selectedDifference.seconds },
  ] : [];

  return (
    <section className={styles.workspace} id="countdowns" aria-labelledby="countdowns-title">
      <div className={styles.sectionHeading}><div><p>YOUR DATE BOARD</p><h2 id="countdowns-title">Keep the moment in view.</h2></div><span><FiClock aria-hidden="true" /> Updates every second</span></div>
      {storageError && <p className={styles.error} role="alert">{storageError}</p>}
      {notice && <p className={styles.notice} role="status" aria-live="polite">{notice}</p>}
      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          {selectedEvent ? (
            <div className={`${styles.featuredTimer} ${selectedDifference.isPast ? styles.elapsed : ""}`}>
              <div className={styles.featuredTop}><span><i />{selectedDifference.isPast ? "TIME ELAPSED" : "COUNTING DOWN"}</span><span>{selectedDifference.isPast ? "SINCE" : "UNTIL"}</span></div>
              <h3>{selectedEvent.name}</h3>
              <time dateTime={selectedEvent.dateTime}>{formatEventDate(selectedEvent.dateTime)}</time>
              <div className={styles.featuredUnits}>{timeUnits.map(({ label, value }) => <div key={label}><b>{String(value).padStart(2, "0")}</b><span>{label}</span></div>)}</div>
              <div className={styles.featuredFoot}><FiCalendar aria-hidden="true" /><span>{selectedDifference.isPast ? "Elapsed since your date" : "Your local date and time"}</span></div>
            </div>
          ) : (
            <div className={styles.featuredEmpty}><span><FiCalendar aria-hidden="true" /></span><h3>Your next moment goes here.</h3><p>Add a date to start a live countdown. Past dates count up as time elapsed.</p></div>
          )}
          <EventForm eventCount={events.length} onAdd={addEvent} />
        </div>
        <div className={styles.eventList}>
          <div className={styles.listHeading}><div><h3>Saved dates</h3><span>{events.length} / {eventLimit}</span></div><p>Nearest dates appear first</p></div>
          {sortedEvents.length ? <div className={styles.cards}>{sortedEvents.map((event) => <EventCard key={event.id} event={event} now={now} selected={selectedEvent?.id === event.id} onSelect={setSelectedId} onDelete={setPendingDelete} />)}</div> : <div className={styles.listEmpty}><FiCalendar aria-hidden="true" /><p>No saved dates yet. Add one with the form to get started.</p></div>}
          <p className={styles.listFoot}>Saved on this device. Times use its local time zone.</p>
        </div>
      </div>
      <p className={styles.limitNote}>One-second updates <span /> Up to {eventLimit} saved events <span /> Stored locally</p>
      {pendingDelete && <DeleteEventConfirm event={pendingDelete} onCancel={() => setPendingDelete(null)} onConfirm={removeEvent} />}
    </section>
  );
};

export default CountdownWorkspace;
