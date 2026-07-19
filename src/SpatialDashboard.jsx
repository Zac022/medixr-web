import React, { useState } from 'react';

const totalModules = [
  { id: 0, icon: '🫁', name: 'Pulmonary Data', location: '11/11 Systems Active', desc: 'Real-time respiratory oxygenation mapping and metric arrays.' },
  { id: 1, icon: '🫀', name: 'Cardio Telemetry', location: 'Active Synced Node', desc: 'Real-time contractility tracker linked to active hardware monitors.' },
  { id: 2, icon: '🧠', name: 'Neural Diagnostics', location: 'Synapse Live Feed', desc: 'Cerebral signal parsing and cortex electrical vector mapping.' }
];

export default function SpatialDashboard() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const glassStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.75)', 
    backdropFilter: 'blur(30px) saturate(130%)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 20px 45px -10px rgba(0, 33, 89, 0.05)',
    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
  };

  return (
    <div style={{ display: 'flex', width: '100%', gap: '28px', marginTop: '12px', alignItems: 'center' }}>
      
      {/* LEFT COLUMN: CRITICAL METRIC MONITOR */}
      <div style={{ ...glassStyle, flex: '1.1', height: '400px', padding: '26px', borderRadius: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#3B72F2', letterSpacing: '0.06em' }}>DATA METRICS</div>
          <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#001A40', margin: '10px 0 0 0', lineHeight: '1.3' }}>Biometric Sync Status</h4>
          <p style={{ fontSize: '13px', color: '#475E7A', lineHeight: '1.5', marginTop: '10px' }}>
            System processing active. Real-time telemetry structures are synchronized across connected client viewports.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0, 33, 89, 0.06)', padding: '16px', borderRadius: '20px' }}>
          <div style={{ fontSize: '11px', color: '#3B72F2', fontWeight: '800' }}>CONNECTED DEVICELAYER STATUS</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#001A40', marginTop: '6px' }}>
            Telemetry stream: <span style={{ color: '#10B981' }}>● ONLINE</span>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: HOVER-INTERACTIVE VISUAL CAROUSEL STAGE */}
      <div style={{ flex: '2.1', height: '400px', borderRadius: '32px', backgroundColor: 'rgba(255, 255, 255, 0.35)', border: '1px solid rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1200px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          {totalModules.map((item, idx) => {
            const offset = idx - activeIndex;
            const isCenter = idx === activeIndex;
            const isHovered = hoveredIndex === idx;
            if (Math.abs(offset) > 1) return null;

            let rotateY = isCenter ? 0 : (offset < 0 ? 42 : -42);
            let translateZ = isCenter ? (isHovered ? 140 : 100) : -70;
            let translateX = isCenter ? 0 : (offset < 0 ? -145 : 145);
            let scale = isCenter ? 1 : 0.86;

            return (
              <div
                key={item.id}
                // SWAPS ACTIVE CARD INDEX ON HOVER SO BACKGROUND CARDS INSTANTLY POP FRONT
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  setActiveIndex(idx);
                }} 
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'absolute', width: isCenter ? '255px' : '220px', height: isCenter ? '330px' : '290px', padding: '24px', borderRadius: '28px', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  backgroundColor: isCenter ? '#002159' : 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(40px)',
                  border: isHovered ? '2px solid #3B72F2' : (isCenter ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(59, 114, 242, 0.2)'),
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: isCenter ? 1 : 0.65, zIndex: 10 - Math.abs(offset), transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)', transformStyle: 'preserve-3d',
                  boxShadow: isCenter ? '0 30px 60px -10px rgba(0, 33, 89, 0.22)' : '0 12px 24px rgba(0, 33, 89, 0.05)'
                }}
              >
                <div>
                  <div style={{ fontSize: '28px', marginBottom: '4px' }}>{item.icon}</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: isCenter ? '#ffffff' : '#001A40' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: isCenter ? '#60A3D9' : '#3B72F2', fontWeight: '700' }}>{item.location}</div>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: isCenter ? '#ffffff' : '#001A40', opacity: 0.8, lineHeight: '1.45', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: LEAD AXIS TRACKER MINI-GLASS */}
      <div style={{ ...glassStyle, flex: '1', height: '400px', padding: '22px 24px', borderRadius: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#001A40', letterSpacing: '0.05em' }}>LIMB LEAD PLACEMENTS</span>
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#475E7A' }}>Active coordinate vectors:</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { tag: 'RA', name: 'Right Arm Lead' }, { tag: 'LA', name: 'Left Arm Lead' },
            { tag: 'RL', name: 'Right Leg Lead' }, { tag: 'LL', name: 'Left Leg Lead' }
          ].map((lead, idx) => (
            <div key={idx} style={{ backgroundColor: '#ffffff', padding: '8px 12px', borderRadius: '12px', border: '1px solid rgba(0,33,89,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#3B72F2' }}>{lead.tag}</span>
              <span style={{ fontSize: '11px', color: '#475E7A' }}>{lead.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}