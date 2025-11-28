// src/storage.js

// Save a finished session (duration in seconds)
export function saveSession(durationSeconds) {
  if (!durationSeconds || durationSeconds <= 0) return;

  const stored = JSON.parse(localStorage.getItem("sessions") || "{}");
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (!stored[today]) stored[today] = [];

  stored[today].push({
    duration: durationSeconds,
    timestamp: Date.now(),
  });

  localStorage.setItem("sessions", JSON.stringify(stored));
}

// Return today's sessions array (each: { duration, timestamp })
export function getTodaySessions() {
  const stored = JSON.parse(localStorage.getItem("sessions") || "{}");
  const today = new Date().toISOString().slice(0, 10);
  return stored[today] || [];
}

// Return last 7 days totals as array of { date: 'YYYY-MM-DD', totalMinutes: n }
export function getWeeklyTotals() {
  const stored = JSON.parse(localStorage.getItem("sessions") || "{}");
  const today = new Date();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const week = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getTime() - i * oneDayMs);
    const key = d.toISOString().slice(0, 10);
    const daySessions = stored[key] || [];
    const totalSeconds = daySessions.reduce((s, item) => s + (item.duration || 0), 0);
    week.push({
      date: key,
      totalMinutes: Math.round(totalSeconds / 60),
    });
  }

  return week;
}

// Raw access to everything (useful for export/debug)
export function getSessions() {
  return JSON.parse(localStorage.getItem("sessions") || "{}");
}
