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
      {/* HEADER BAR */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
          <img src="/medixr_logo.png" alt="MediXR Logo" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div>
          <button style={{ backgroundColor: '#3B72F2', border: 'none', color: '#ffffff', padding: '12px 24px', borderRadius: '99px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            Book Appointment ↗
          </button>
        </div>
      </div>

      {/* CORE WORKSPACE */}
      <div style={{ width: '100%', maxWidth: '1440px' }}>
        {children}
      </div>

      {/* MOBILE RESPONSIVE INJECTIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .spatial-layout-wrapper { padding: 20px !important; }
          /* Targets App.jsx structural grid layout split */
          .spatial-layout-wrapper > div + div { flex-direction: column !important; gap: 32px !important; }
          /* Targets Hero horizontal columns split */
          .spatial-layout-wrapper div[style*="gap: 64px"] { flex-direction: column !important; gap: 32px !important; }
          /* Targets Dashboard horizontal cards split */
          .spatial-layout-wrapper div[style*="gap: 28px"] { flex-direction: column !important; gap: 20px !important; }
          /* Forces titles to look crisp on smaller mobile screens */
          h1 { font-size: 34px !important; }
        }
      `}} />
    </div>
  );
}