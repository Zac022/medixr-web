import React, { useState } from 'react';

const sidebarData = {
  home: {
    title: 'Overview',
    subItems: [
      { name: 'Core Baseline', yOffset: 0 },
      { name: 'Data Tracking', yOffset: 46 },
      { name: 'System Logs', yOffset: 92 }
    ]
  },
  models: {
    title: 'Anatomy Vault',
    subItems: [
      { name: '3D Organ Models', yOffset: 0 },
      { name: 'Anatomical Sync', yOffset: 46 },
      { name: 'Pathology Profiles', yOffset: 92 }
    ]
  },
  settings: {
    title: 'Configuration',
    subItems: [
      { name: 'System Settings', yOffset: 0 },
      { name: 'WebGL Drivers', yOffset: 46 },
      { name: 'Hardware Sync', yOffset: 92 }
    ]
  },
  account: {
    title: 'User Profile',
    subItems: [
      { name: 'User Portal', yOffset: 0 },
      { name: 'Security Keys', yOffset: 46 },
      { name: 'License Status', yOffset: 92 }
    ]
  }
};

const navIcons = [
  { id: 'home', symbol: '🏠', yOffset: 0 },
  { id: 'models', symbol: '📦', yOffset: 64 },      
  { id: 'settings', symbol: '⚙️', yOffset: 128 },
  { id: 'account', symbol: '👤', yOffset: 192 }
];

export default function SpatialSidebar({ activeTab, setActiveTab, activeSubItem, setActiveSubItem }) {
  const [hoveredIconY, setHoveredIconY] = useState(null);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [hoveredSubY, setHoveredSubY] = useState(null);
  const [isSubHovered, setIsSubHovered] = useState(false);

  const currentPanel = sidebarData[activeTab] || sidebarData['home'];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveSubItem(sidebarData[tabId].subItems[0].name);
  };

  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', height: 'fit-content' }}>
      
      {/* COMPACT PRIMARY ICON STRIP */}
      <div 
        onMouseLeave={() => setIsIconHovered(false)}
        style={{
          display: 'flex', flexDirection: 'column', gap: '20px', padding: '18px 12px',
          borderRadius: '24px', backgroundColor: 'rgba(255, 255, 255, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(30px)',
          position: 'relative', boxShadow: '0 10px 30px rgba(0,33,89,0.05)'
        }}
      >
        <div
          style={{
            position: 'absolute', left: '12px', top: '18px', width: '44px', height: '44px', borderRadius: '50%',
            backgroundColor: 'rgba(59, 114, 242, 0.12)', border: '1px solid rgba(59, 114, 242, 0.25)',
            pointerEvents: 'none', zIndex: 1, opacity: isIconHovered ? 1 : 0,
            transform: `translateY(${hoveredIconY}px) scale(${isIconHovered ? 1.05 : 0.8})`,
            transition: 'transform 0.35s cubic-bezier(0.25, 1.25, 0.4, 1), opacity 0.2s ease'
          }}
        />

        {navIcons.map((icon) => {
          const isActive = activeTab === icon.id;
          return (
            <button
              key={icon.id}
              onClick={() => handleTabChange(icon.id)}
              onMouseEnter={() => { setHoveredIconY(icon.yOffset); setIsIconHovered(true); }}
              style={{
                width: '44px', height: '44px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer',
                border: 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: isActive ? 'rgba(59, 114, 242, 0.15)' : 'transparent', outline: 'none', zIndex: 2
              }}
            >
              <span>{icon.symbol}</span>
            </button>
          );
        })}
      </div>

      {/* RE-FOCUSED OPTION SUB-PANEL */}
      <div 
        style={{
          width: '190px', padding: '24px 16px', borderRadius: '24px', backgroundColor: 'rgba(255, 255, 255, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(25px)', display: 'flex',
          flexDirection: 'column', gap: '16px', boxShadow: '0 20px 40px rgba(0, 33, 89, 0.05)', position: 'relative'
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#475E7A', letterSpacing: '0.08em', paddingLeft: '14px' }}>
          {currentPanel.title.toUpperCase()}
        </div>

        <div onMouseLeave={() => setIsSubHovered(false)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute', left: '0px', right: '0px', top: '0px', height: '36px', borderRadius: '12px',
              backgroundColor: 'rgba(59, 114, 242, 0.08)', border: '1px solid rgba(59, 114, 242, 0.15)',
              pointerEvents: 'none', zIndex: 1, opacity: isSubHovered ? 1 : 0, transform: `translateY(${hoveredSubY}px)`,
              transition: 'transform 0.32s cubic-bezier(0.25, 1.25, 0.4, 1), opacity 0.2s ease'
            }}
          />

          {currentPanel.subItems.map((subItem) => {
            const isSubActive = activeSubItem === subItem.name;
            return (
              <div
                key={subItem.name}
                onClick={() => setActiveSubItem(subItem.name)}
                onMouseEnter={() => { setHoveredSubY(subItem.yOffset); setIsSubHovered(true); }}
                style={{
                  cursor: 'pointer', fontSize: '13px', height: '36px', fontWeight: isSubActive ? '700' : '500',
                  color: isSubActive ? '#3B72F2' : '#001A40', opacity: isSubActive ? 1 : 0.65,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px',
                  borderRadius: '12px', transition: 'all 0.2s ease', position: 'relative', zIndex: 2
                }}
              >
                <span>{subItem.name}</span>
                {isSubActive && <span style={{ width: '6px', height: '6px', backgroundColor: '#3B72F2', borderRadius: '50%' }} />}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}