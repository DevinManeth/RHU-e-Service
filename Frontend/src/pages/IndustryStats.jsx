import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function IndustryStats() {
  const [industryData, setIndustryData] = useState([]);

  const categories = [
    "it",
    "healthcare",
    "finance",
    "education",
    "media",
    "hospitality and tourism",
    "other",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobowners");
        const data = await response.json();

        const stats = categories.reduce((acc, cat) => {
          acc[cat] = { count: 0, incomeSum: 0 };
          return acc;
        }, {});

        data.forEach((job) => {
          const industry = job.industry?.toLowerCase();

          
          let avgIncome = 0;
          if (job.monthlyIncome) {
            const parts = job.monthlyIncome.split("-");
            if (parts.length === 2) {
              const low = parseInt(parts[0], 10);
              const high = parseInt(parts[1], 10);
              if (!isNaN(low) && !isNaN(high)) {
                avgIncome = (low + high) / 2;
              }
            } else {
              const single = parseInt(job.monthlyIncome, 10);
              if (!isNaN(single)) {
                avgIncome = single;
              }
            }
          }

          if (categories.includes(industry)) {
            stats[industry].count += 1;
            stats[industry].incomeSum += avgIncome;
          } else {
            stats["other"].count += 1;
            stats["other"].incomeSum += avgIncome;
          }
        });

        const total = data.length || 1;

        const formattedData = Object.entries(stats).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: Number(((value.count / total) * 100).toFixed(2)),
          avgIncome:
            value.count > 0
              ? Number((value.incomeSum / value.count).toFixed(2))
              : 0,
        }));

        setIndustryData(formattedData);
      } catch (err) {
        console.error("Error fetching industry data:", err);
      }
    };

    fetchData();
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A020F0",
    "#FF1493",
    "#808080",
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">
        Industry Distribution
      </h1>

      
      <ResponsiveContainer width="80%" height={550}>
        <PieChart margin={{ top: 40, right: 80, bottom: 40, left: 80 }}>
          <Pie
            data={industryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={180}
            labelLine={true} 
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {industryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      
      <div className="mt-10 w-3/4 bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="py-2 px-4">Industry</th>
              <th className="py-2 px-4">Percentage (%)</th>
              <th className="py-2 px-4">Average Income ($)</th>
            </tr>
          </thead>
          <tbody>
            {industryData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.value}%</td>
                <td className="py-2 px-4">
                  {item.avgIncome > 0 ? `$${item.avgIncome}` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="mt-12 bg-white shadow rounded-lg p-6 w-full md:w-3/4">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">
          Average Income by Industry
        </h2>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={industryData}
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Bar dataKey="avgIncome">
              {industryData.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IndustryStats;




