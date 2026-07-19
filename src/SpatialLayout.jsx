import React from 'react';

export default function SpatialLayout({ children }) {
  return (
    <div 
      className="spatial-layout-wrapper"
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #F4F7FC 0%, #E3EDFB 60%, #C9DFF6 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '40px 60px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* CLINICAL HEADER */}
      <div className="spatial-header" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/medixr_logo.png" 
            alt="MediXR Logo" 
            className="spatial-logo"
            style={{ 
              height: '64px',
              width: 'auto',
              objectFit: 'contain',
              cursor: 'pointer',
              filter: 'drop-shadow(0 4px 12px rgba(0, 33, 89, 0.08))'
            }} 
          />
        </div>
        <div>
          <button style={{ backgroundColor: '#3B72F2', border: 'none', color: '#ffffff', padding: '12px 24px', borderRadius: '99px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            Book Appointment ↗
          </button>
        </div>
      </div>

      {/* CORE WORKSPACE ENTRY */}
      <div style={{ width: '100%', maxWidth: '1440px' }}>
        {children}
      </div>

      {/* FIXED RESPONSIVE MEDIA OVERRIDES */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .spatial-layout-wrapper { padding: 24px 16px !important; }
          .spatial-header { margin-bottom: 24px !important; }
          .spatial-logo { height: 44px !important; }
          
          /* Target specific grid blocks cleanly without bleeding into child layouts */
          .responsive-grid-row { flex-direction: column !important; gap: 32px !important; }
          .dashboard-grid-row { flex-direction: column !important; gap: 24px !important; }
          
          .responsive-grid-col { width: 100% !important; flex: none !important; }
          .dashboard-grid-col { width: 100% !important; height: auto !important; flex: none !important; }
          
          h1 { font-size: 36px !important; }
        }
      `}} />
    </div>
  );
}