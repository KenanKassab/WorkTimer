// src/App.jsx
import React, { useState, useCallback } from "react";
import Timer from "./Timer";
import TodayChart from "./TodayChart";
import WeekChart from "./WeeklyChart";

export default function App() {
  // sessionsVersion increments each time a new session is saved.
  // Charts consume this to reload data only when needed.
  const [sessionsVersion, setSessionsVersion] = useState(0);

  // called by Timer when a session is saved (or auto-saved on unload)
  const handleSessionSaved = useCallback(() => {
    setSessionsVersion((v) => v + 1);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <h1>Work Time Tracker</h1>

      <Timer onSessionSaved={handleSessionSaved} />

      <hr />

      <h2>Today's Sessions</h2>
      <TodayChart version={sessionsVersion} />

      <hr />

      <h2>This Week</h2>
      <WeekChart version={sessionsVersion} />
    </div>
  );
}
