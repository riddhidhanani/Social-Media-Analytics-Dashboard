// src/components/Dashboard.jsx
import React, { useState, useRef } from 'react';
import mockData from '../data/mockData';
import SummaryCards from './SummaryCards';
import ChartEngagementOverTime from './ChartEngagementOverTime';
import ChartPostTypeBreakdown from './ChartPostTypeBreakdown';
import ChartTopPosts from './ChartTopPosts';
import Sidebar from './Sidebar';
import PanelWrapper from './PanelWrapper';
import PDFDownload from './PDFDownload';
import { Card } from 'react-bootstrap';

const platforms = ['All', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'];

const Dashboard = () => {
  const [activePlatform, setActivePlatform] = useState('All');
  const dashboardRef = useRef(null);

  const filteredData =
    activePlatform === 'All'
      ? mockData
      : mockData.filter((item) => item.platform === activePlatform);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        platforms={platforms}
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center flex-1">Social Insights Dashboard</h1>
          <PDFDownload 
            dashboardRef={dashboardRef}
            data={filteredData}
            activePlatform={activePlatform}
          />
        </div>
        <div ref={dashboardRef}>
          <Card className="mb-6 shadow-sm border-0">
            <SummaryCards data={filteredData} />
          </Card>
          <PanelWrapper title="Engagement Rate Over Time">
            <ChartEngagementOverTime data={filteredData} />
          </PanelWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <PanelWrapper title="Post Type Breakdown">
              <ChartPostTypeBreakdown data={filteredData} />
            </PanelWrapper>
            <PanelWrapper title="Top 5 Posts by Engagement">
              <ChartTopPosts data={filteredData} />
            </PanelWrapper>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
