import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Data for industries
const data = [
  { name: "IT", value: 30 },
  { name: "Education", value: 20 },
  { name: "Healthcare", value: 5 },
  { name: "Finance", value: 32 },
  { name: "Media", value: 12 },
  { name: "Hospitality and Tourism", value: 5 },
  { name: "Other", value: 1 },
];

// Colors for each sector
const COLORS = ["oklch(57.7% 0.245 27.325)", "oklch(81% 0.117 11.638)", "oklch(76.8% 0.233 130.85)", "oklch(48.8% 0.243 264.376)", "oklch(43.8% 0.218 303.724)", "oklch(66.7% 0.295 322.15)", "oklch(12.9% 0.042 264.695)"];

const IndustryGraph = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-4">Industry Distribution</h1>
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default IndustryGraph;
