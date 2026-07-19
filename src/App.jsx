import React, { useState } from 'react';
import SpatialLayout from './SpatialLayout';
import SpatialSidebar from './SpatialSidebar';
import SpatialHero from './SpatialHero';
import SpatialDashboard from './SpatialDashboard';

export default function App() {
  // Master state tracking the active primary category
  const [activeTab, setActiveTab] = useState('simulations');
  const [activeSubItem, setActiveSubItem] = useState('Anatomy Exploration');

  return (
    <SpatialLayout>
      <div style={{ display: 'flex', width: '100%', gap: '48px', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: SIDEBAR CONTROLLER PASSING STATE UP */}
        <div style={{ position: 'sticky', top: '24px' }}>
          <SpatialSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            activeSubItem={activeSubItem}
            setActiveSubItem={setActiveSubItem}
          />
        </div>

        {/* RIGHT COLUMN: MAIN PANEL STACK */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* THE HERO VIEWPORT: NOW RECONSTRUCTED TO RESPOND TO SIDEBAR STATE */}
          <SpatialHero activeTab={activeTab} activeSubItem={activeSubItem} />

          {/* THE DATA DECK CAROUSEL */}
          <SpatialDashboard />

        </div>
      </div>
    </SpatialLayout>
  );
}