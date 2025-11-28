// src/TodayChart.jsx
import React, { useEffect, useState } from "react";
import { getTodaySessions } from "./storage";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TodayChart({ version }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sessions = getTodaySessions(); // durations in seconds
    const formatted = sessions.map((s, i) => ({
      name: `S${i + 1}`,
      minutes: Math.round((s.duration || s) / 60), // support both shapes
    }));
    setData(formatted);
  }, [version]);

  if (!data || data.length === 0) return <p>No sessions today yet.</p>;

  return (
    <div style={{ marginTop: 12, width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="minutes" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(TodayChart);
