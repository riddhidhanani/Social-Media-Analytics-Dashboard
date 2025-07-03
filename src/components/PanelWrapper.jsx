// src/components/PanelWrapper.jsx
import React from 'react';

const PanelWrapper = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default PanelWrapper;
