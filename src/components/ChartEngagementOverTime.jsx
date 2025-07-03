// src/components/ChartEngagementOverTime.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const ChartEngagementOverTime = ({ data }) => {
  // Sort the data by post_date (ascending)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.post_date) - new Date(b.post_date)
  );

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="post_date" />
          <YAxis domain={[0, 'dataMax + 1']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="engagement_rate"
            stroke="#8884d8"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartEngagementOverTime;

