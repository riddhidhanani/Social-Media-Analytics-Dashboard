// src/components/ChartTopPosts.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const platformColors = {
  LinkedIn: '#0077B5',
  Facebook: '#1877F2',
  Instagram: '#E1306C',
  YouTube: '#FF0000',
};

function ChartTopPosts({ data }) {
  const topPosts = [...data]
    .sort((a, b) => b.engagement_rate - a.engagement_rate)
    .slice(0, 5);

  return (
    <div className="bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topPosts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="post_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="engagement_rate">
            {topPosts.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={platformColors[entry.platform]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartTopPosts;

