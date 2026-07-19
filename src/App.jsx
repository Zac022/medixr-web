import React, { useState } from 'react';
import SpatialLayout from './SpatialLayout';
import SpatialSidebar from './SpatialSidebar';
import SpatialHero from './SpatialHero';
import SpatialDashboard from './SpatialDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('simulations');
  const [activeSubItem, setActiveSubItem] = useState('Core Baseline');

  return (
    <SpatialLayout>
      <div className="responsive-grid-row" style={{ display: 'flex', width: '100%', gap: '48px', alignItems: 'flex-start' }}>
        
        {/* LEFT COMPONENT COLUMN */}
        <div className="responsive-grid-col" style={{ position: 'sticky', top: '24px', zIndex: 10 }}>
          <SpatialSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            activeSubItem={activeSubItem}
            setActiveSubItem={setActiveSubItem}
          />
        </div>

        {/* MAIN PANEL CONTENT VIEWPORTS */}
        <div className="responsive-grid-col" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '48px', width: '100%' }}>
          
          <SpatialHero activeTab={activeTab} />

          <SpatialDashboard />

        </div>
      </div>
    </SpatialLayout>
  );
}