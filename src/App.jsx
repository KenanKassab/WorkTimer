import { useState, useRef, useEffect } from "react";
import { saveSession } from "./storage";
import TodaySessions from "./TodaySessions";
import TodayChart from "./TodayChart";
import WeeklyChart from "./WeeklyChart";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (running) return;
    setRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);

    if (seconds > 0) {
      saveSession(seconds);
    }

    setSeconds(0);
  };

  // Save running session only when page is being closed or refreshed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (seconds > 0) {
        saveSession(seconds);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(intervalRef.current);
    };
  }, []); // Notice empty dependency array — runs only once

  const formatTime = () => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Work Time Tracker</h1>

      <div style={{ fontSize: "3rem", margin: "2rem 0" }}>
        {formatTime()}
      </div>

      {!running ? (
        <button onClick={startTimer} style={{ padding: "1rem", fontSize: "1rem", marginRight: "1rem" }}>
          Start
        </button>
      ) : (
        <button onClick={pauseTimer} style={{ padding: "1rem", fontSize: "1rem", marginRight: "1rem" }}>
          Pause
        </button>
      )}

      <button onClick={stopTimer} style={{ padding: "1rem", fontSize: "1rem" }}>
        Stop (Save Session)
      </button>
      <TodaySessions />
      <TodayChart />
      <WeeklyChart />
    </div>
  );
}
