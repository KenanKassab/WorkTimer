import { getSessions } from "./storage";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function TodayChart() {
  const today = new Date().toISOString().slice(0, 10);
  const sessions = getSessions()[today] || [];

  // Return null early if no sessions
  if (sessions.length === 0) return <p>No sessions yet for chart.</p>;

  const data = sessions.map((s, index) => ({
    name: `Session ${index + 1}`,
    duration: Math.round(s.duration / 60) // convert to minutes
  }));

  return (
    <div style={{ marginTop: "2rem", width: "100%", height: "300px" }}>
      <h2>Today's Sessions Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="duration" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
