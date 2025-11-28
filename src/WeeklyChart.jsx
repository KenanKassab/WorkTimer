// src/WeekChart.jsx
import React, { useEffect, useState } from "react";
import { getWeeklyTotals } from "./storage";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeekChart({ version }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const totals = getWeeklyTotals(); // array of { date, totalMinutes }
    const formatted = totals.map((d) => {
      // short label (e.g., "Mon 11/23")
      const dt = new Date(d.date);
      const label = dt.toLocaleDateString(undefined, { weekday: "short" });
      return { day: label, minutes: d.totalMinutes };
    });
    setData(formatted);
  }, [version]);

  if (!data || data.length === 0) return <p>No data for this week yet.</p>;

  return (
    <div style={{ marginTop: 12, width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="minutes" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(WeekChart);
