import React from 'react';

export default function SpatialLayout({ children }) {
  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100vw',
        // HIGH-TRUST MEDICAL GRADIENT BACKGROUND
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
      {/* PROFESSIONAL CLINICAL HEADER BAR */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        
        {/* LOGO CONTAINER WITH INCREASED PROFILE SIZE */}
        <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
          <img 
            src="/medixr_logo.png" 
            alt="MediXR Logo" 
            style={{ 
              height: '64px', // Scaled up significantly for a more premium visual presence
              width: 'auto',
              objectFit: 'contain',
              cursor: 'pointer',
              filter: 'drop-shadow(0 4px 12px rgba(0, 33, 89, 0.08))'
            }} 
          />
        </div>
        
        {/* RIGHT SIDE ACTIONS */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            style={{
              backgroundColor: '#3B72F2',
              border: 'none',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '99px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(59, 114, 242, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            Book Appointment ↗
          </button>
        </div>
      </div>

      {/* CORE WORKSPACE ENTRY CONTAINER */}
      <div style={{ width: '100%', maxWidth: '1440px' }}>
        {children}
      </div>

    </div>
  );
}