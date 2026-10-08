import assert from "node:assert/strict";
import test from "node:test";
import { eventLimit, getEventPreset, getTimeDifference, sortEvents, validateEvent } from "./events.js";

test("validates event names and local date-time values", () => {
  assert.deepEqual(validateEvent({ name: "  Launch day ", dateTime: "2027-03-14T09:30" }), { name: "Launch day", dateTime: "2027-03-14T09:30" });
  assert.throws(() => validateEvent({ name: "", dateTime: "2027-03-14T09:30" }), /name/);
  assert.throws(() => validateEvent({ name: "x".repeat(49), dateTime: "2027-03-14T09:30" }), /under/);
  assert.throws(() => validateEvent({ name: "Launch", dateTime: "invalid" }), /valid date/);
});

test("formats countdown and elapsed time into day and clock units", () => {
  const future = getTimeDifference(90_061_000, 0);
  assert.deepEqual(future, { isPast: false, days: 1, hours: 1, minutes: 1, seconds: 1 });
  const past = getTimeDifference(0, 90_061_000);
  assert.deepEqual(past, { isPast: true, days: 1, hours: 1, minutes: 1, seconds: 1 });
});

test("orders future events by nearest date and past events by most recent", () => {
  const now = Date.parse("2026-01-10T00:00:00Z");
  const events = [
    { id: "past-old", dateTime: "2026-01-01T00:00:00Z" },
    { id: "future-late", dateTime: "2026-03-01T00:00:00Z" },
    { id: "past-new", dateTime: "2026-01-09T00:00:00Z" },
    { id: "future-soon", dateTime: "2026-01-11T00:00:00Z" },
  ];
  assert.deepEqual(sortEvents(events, now).map((event) => event.id), ["future-soon", "future-late", "past-new", "past-old"]);
});

test("provides useful local date presets", () => {
  const now = new Date(2026, 6, 4, 12, 30);
  const tomorrow = getEventPreset("tomorrow", now);
  const newYear = getEventPreset("newYear", now);
  const month = getEventPreset("month", now);
  const monthEnd = getEventPreset("month", new Date(2026, 0, 31, 12, 30));
  assert.equal(tomorrow.name, "Tomorrow morning");
  assert.match(tomorrow.dateTime, /T09:00$/);
  assert.equal(new Date(newYear.dateTime).getMonth(), 0);
  assert.equal(new Date(month.dateTime).getMonth(), 7);
  assert.equal(new Date(monthEnd.dateTime).getDate(), 28);
  assert.equal(eventLimit, 20);
});
