// src/App.jsx
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import mockData from './data/mockData';

function App() {
  const [data] = useState(mockData); 

  return (
    <div className="container mx-auto p-4">
      <Dashboard data={data} />
    </div>
  );
}

export default App;


