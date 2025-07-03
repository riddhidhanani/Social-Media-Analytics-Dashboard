import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function ChartPostTypeBreakdown({ data }) {
  const typeCount = data.reduce((acc, cur) => {
    const type = cur.post_type.trim().toLowerCase(); // Normalize
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  console.log("DEBUG - Post Type Counts:", typeCount);

  const chartData = Object.entries(typeCount).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize for label
    value: count,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartPostTypeBreakdown;
