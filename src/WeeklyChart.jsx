import { getWeeklyTotals } from "./storage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function WeeklyChart() {
  const data = getWeeklyTotals();

  // If no work this week yet
  if (data.every(d => d.totalMinutes === 0)) return <p>No work done this week yet.</p>;

  return (
    <div style={{ marginTop: "2rem", width: "100%", height: "300px" }}>
      <h2>Weekly Total Work (minutes)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="totalMinutes" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
