export const eventLimit = 20;
export const eventNameLimit = 48;
export const eventStorageKey = "date-countdown-events-v1";

export const dateToLocalInput = (date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 16);
};

export const getEventPreset = (preset, now = new Date()) => {
  const target = new Date(now);
  if (preset === "tomorrow") {
    target.setDate(target.getDate() + 1);
    target.setHours(9, 0, 0, 0);
    return { name: "Tomorrow morning", dateTime: dateToLocalInput(target) };
  }
  if (preset === "newYear") {
    target.setFullYear(target.getFullYear() + 1, 0, 1);
    target.setHours(0, 0, 0, 0);
    return { name: "New Year", dateTime: dateToLocalInput(target) };
  }
  if (preset === "month") {
    target.setMonth(target.getMonth() + 1);
    return { name: "One month from now", dateTime: dateToLocalInput(target) };
  }
  throw new Error("Choose a supported date preset.");
};

export const validateEvent = ({ name, dateTime }) => {
  const cleanName = String(name ?? "").trim();
  const cleanDateTime = String(dateTime ?? "").trim();
  if (!cleanName) throw new Error("Give this event a name.");
  if (cleanName.length > eventNameLimit) throw new Error(`Keep the event name under ${eventNameLimit} characters.`);
  if (!cleanDateTime || !Number.isFinite(new Date(cleanDateTime).getTime())) throw new Error("Choose a valid date and time.");
  return { name: cleanName, dateTime: cleanDateTime };
};

export const getTimeDifference = (targetTime, nowTime = Date.now()) => {
  const delta = new Date(targetTime).getTime() - Number(nowTime);
  if (!Number.isFinite(delta)) throw new Error("Choose a valid date and time.");
  const totalSeconds = Math.floor(Math.abs(delta) / 1000);
  return {
    isPast: delta <= 0,
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
};

export const sortEvents = (events, nowTime = Date.now()) => [...events].sort((first, second) => {
  const firstTime = new Date(first.dateTime).getTime();
  const secondTime = new Date(second.dateTime).getTime();
  const firstFuture = firstTime >= nowTime;
  const secondFuture = secondTime >= nowTime;
  if (firstFuture !== secondFuture) return firstFuture ? -1 : 1;
  return firstFuture ? firstTime - secondTime : secondTime - firstTime;
});

export const formatEventDate = (dateTime) => {
  const date = new Date(dateTime);
  return Number.isNaN(date.getTime()) ? "Invalid date" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
};
