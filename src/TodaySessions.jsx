import { getSessions } from "./storage";

export default function TodaySessions() {
  const today = new Date().toISOString().slice(0, 10);
  const sessions = getSessions()[today] || [];

  const formatSeconds = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Today's Sessions</h2>

      {sessions.length === 0 && <p>No sessions yet.</p>}

      <ul>
        {sessions.map((s, i) => (
          <li key={i}>
            <strong>Session {i + 1}:</strong> {formatSeconds(s.duration)}
          </li>
        ))}
      </ul>
    </div>
  );
}
