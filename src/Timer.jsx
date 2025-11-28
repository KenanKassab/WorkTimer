// src/Timer.jsx
import React, { useEffect, useRef, useState } from "react";
import { saveSession } from "./storage";

export default function Timer({ onSessionSaved }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // start the interval when running toggles true
  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running]);

  // auto-save if user closes/reloads while timer is running
  useEffect(() => {
    const handler = () => {
      if (seconds > 0) {
        // save current running session
        saveSession(seconds);
        if (onSessionSaved) onSessionSaved();
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
    // note: no dependency on seconds — handler reads seconds from closure,
    // but we avoid re-registering the listener every second; this means the
    // value used will be the value at the time the user closes the page.
    // To ensure the saved seconds are up-to-date, we call saveSession synchronously
    // on the event — it's acceptable for this use case.
  }, [onSessionSaved, seconds]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const stop = () => {
    setRunning(false);
    if (seconds > 0) {
      saveSession(seconds);
      if (onSessionSaved) onSessionSaved();
    }
    setSeconds(0);
  };

  const format = (secs) => {
    const h = Math.floor(secs / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{ padding: "1rem 0" }}>
      <div style={{ fontSize: "3rem", marginBottom: 12 }}>{format(seconds)}</div>

      {!running ? (
        <button onClick={start} style={{ padding: "0.75rem 1rem", fontSize: 16, marginRight: 10 }}>
          Start
        </button>
      ) : (
        <button onClick={pause} style={{ padding: "0.75rem 1rem", fontSize: 16, marginRight: 10 }}>
          Pause
        </button>
      )}

      <button onClick={stop} style={{ padding: "0.75rem 1rem", fontSize: 16 }}>
        Stop (Save Session)
      </button>
    </div>
  );
}
