import React, { useState, useEffect, useRef } from 'react';

// TARGETED LAB CONFIGURATION MAP EXTRACTED FROM DECK SIMULATIONS
const assetMap = {
  'home': {
    src: '/models/human_heart.glb', 
    title: 'Immersive Medical Simulations',
    desc: 'On a mission to train 1M medical students with 1,000+ custom VR and AR simulations to solve surgical facility shortages.',
    tag: 'CORE MISSION',
    orbit: '0deg 75deg 105%',
    target: '0m 0m 0m',
    fov: '30deg'
  },
  'models': {
    src: '/models/human_heart.glb', 
    title: 'Anatomy Lab Framework',
    desc: 'Extensive library of 3D virtual anatomical models with 11 of 11 systems simulated, including patient variations with comorbidities.',
    tag: '11/11 SYSTEMS SIMULATED',
    orbit: '180deg 60deg 100%',
    target: '0m 0.05m 0m',
    fov: '28deg'
  },
  'simulations': {
    src: '/models/human_heart.glb', 
    title: 'Surgery Lab Environment',
    desc: 'Interactive modules providing over 5 hours of continuous surgical training simulations, including a comprehensive surgical safety checklist system.',
    tag: '5+ HOURS SURGICAL SIMULATION',
    orbit: '45deg 75deg 100%',
    target: '0m 0m 0m',
    fov: '30deg'
  },
  'settings': {
    src: '/models/human_heart.glb',
    title: 'Surgical Recordings Hub',
    desc: 'Capturing real-time clinical procedures in immersive 360° VR to create an on-demand training repository of expert-performed operations.',
    tag: '360° VR REPOSITORY',
    orbit: '90deg 90deg 60%', 
    target: '0.02m 0.1m 0.05m',
    fov: '18deg'
  },
  'account': {
    src: '/models/human_heart.glb',
    title: 'Verified Practitioner Portal',
    desc: 'Secure portal layer syncing simulation metrics, training milestones, and educational licensing profiles.',
    tag: 'SECURITY TIER',
    orbit: '-45deg 80deg 120%',
    target: '0m 0m 0m',
    fov: '35deg'
  }
};

export default function SpatialHero({ activeTab }) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioIntervalRef = useRef(null);

  const currentAsset = assetMap[activeTab] || assetMap['simulations'];

  // --- AUDIO SYNTHESIZER ENGINE ---
  const playHeartbeatSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now); 
      osc1.frequency.exponentialRampToValueAtTime(0.01, now + 0.12);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc1.connect(gain1); gain1.connect(ctx.destination);
      osc1.start(now); osc1.stop(now + 0.12);

      const lubDubDelay = 0.15; 
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(65, now + lubDubDelay);
      osc2.frequency.exponentialRampToValueAtTime(0.01, now + lubDubDelay + 0.1);
      gain2.gain.setValueAtTime(0.35, now + lubDubDelay);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + lubDubDelay + 0.1);
      osc2.connect(gain2); gain2.connect(ctx.destination);
      osc2.start(now + lubDubDelay); osc2.stop(now + lubDubDelay + 0.1);
    } catch (e) { console.log("Audio deferred."); }
  };

  // --- NEON ECG TELEMETRY CANVAS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const points = [];
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#3B72F2'; ctx.lineWidth = 2.5; ctx.shadowBlur = 10; ctx.shadowColor = '#3B72F2';
      ctx.beginPath();
      let targetY = height / 2;
      const cycleTime = Date.now() % 500;

      if (activeHotspot) {
        if (cycleTime > 5 && cycleTime < 35) targetY = height / 2 - 25;
        else if (cycleTime >= 35 && cycleTime < 60) targetY = height / 2 + 30;
        else if (cycleTime >= 65 && cycleTime < 100) targetY = height / 2 - 10;
      }

      points.push({ x: width, y: targetY });
      if (points.length > width / 2) points.shift();

      for (let i = 0; i < points.length; i++) {
        points[i].x -= 2;
        if (i === 0) ctx.moveTo(points[i].x, points[i].y);
        else ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeHotspot]);

  const handleSelectHotspot = (id) => {
    setActiveHotspot(id);
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    if (id) {
      playHeartbeatSound();
      audioIntervalRef.current = setInterval(playHeartbeatSound, 500);
    }
  };

  useEffect(() => {
    setActiveHotspot(null);
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
  }, [activeTab]);

  return (
    <div style={{ display: 'flex', width: '100%', gap: '64px', alignItems: 'center', minHeight: '440px' }}>
      
      {/* LEFT COLUMN: PRIMARY SIMULATION VIEWPORT */}
      <div style={{ flex: '1.2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '460px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <div style={{ position: 'absolute', width: '320px', height: '320px', backgroundColor: 'rgba(59, 114, 242, 0.06)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', width: '290px', height: '290px', borderRadius: '50%', border: '1.5px dashed rgba(0, 33, 89, 0.45)', animation: 'orbitClockwise 40s linear infinite', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', width: '330px', height: '330px', borderRadius: '50%', border: '1px solid rgba(0, 33, 89, 0.12)', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', bottom: '40px', width: '140px', height: '16px', backgroundColor: 'rgba(0, 21, 89, 0.12)', borderRadius: '50%', filter: 'blur(8px)', pointerEvents: 'none', zIndex: 1, animation: 'shadowPulse 1.2s infinite ease-in-out' }} />

          <canvas ref={canvasRef} width={240} height={100} style={{ position: 'absolute', bottom: '15px', right: '25px', zIndex: 4, pointerEvents: 'none', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '16px', opacity: activeHotspot ? 1 : 0, transform: activeHotspot ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)', transition: 'all 0.4s ease' }} />

          <model-viewer
            key={currentAsset.title} 
            src={currentAsset.src}
            fallback-src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
            camera-controls
            auto-rotate={!activeHotspot}
            autoplay
            ar
            camera-orbit={currentAsset.orbit}
            camera-target={currentAsset.target}
            field-of-view={currentAsset.fov}
            interaction-prompt="none"
            style={{ width: '100%', height: '100%', outline: 'none', position: 'relative', zIndex: 2 }}
          >
            {activeTab === 'simulations' && (
              <>
                <button slot="hotspot-aorta" data-position="0.17m 0.28m 0.05m" data-normal="0m 1m 0m" className={`spatial-hotspot ${activeHotspot === 'aorta' ? 'active-pulse' : ''}`} onClick={() => handleSelectHotspot(activeHotspot === 'aorta' ? null : 'aorta')}>
                  <div className="hotspot-popover"><span className="hotspot-tag">LIVE</span><div className="hotspot-content"><h6>Surgery Lab</h6><p>Click to test active surgical checklist arrays.</p></div></div>
                </button>
                <button slot="hotspot-ventricle" data-position="-0.1m 0.05m 0.15m" data-normal="0m 0m 1m" className={`spatial-hotspot ${activeHotspot === 'ventricle' ? 'active-pulse' : ''}`} onClick={() => handleSelectHotspot(activeHotspot === 'ventricle' ? null : 'ventricle')}>
                  <div className="hotspot-popover"><span className="hotspot-tag">LIVE</span><div className="hotspot-content"><h6>Comorbidity Variant</h6><p>Click to view custom structural pathology markers.</p></div></div>
                </button>
              </>
            )}
          </model-viewer>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes orbitClockwise { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes shadowPulse { 0% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.8; } }
            .spatial-hotspot { width: 16px; height: 16px; border-radius: 50%; border: none; background-color: #ffffff; box-shadow: 0 0 8px #ffffff, 0 0 0 4px rgba(0, 33, 89, 0.15); cursor: pointer; position: relative; transition: all 0.25s ease; }
            .spatial-hotspot:hover, .active-pulse { transform: scale(1.2); background-color: #3B72F2; box-shadow: 0 0 15px #3B72F2, 0 0 0 5px rgba(59, 114, 242, 0.25); }
            .hotspot-popover { position: absolute; left: 26px; top: -20px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 14px; padding: 10px 14px; display: flex; gap: 8px; align-items: center; width: 190px; box-shadow: 0 12px 30px rgba(0, 33, 89, 0.08); opacity: 0; transform: translateX(-8px); transition: all 0.3s ease; zIndex: 10; pointer-events: none;}
            .spatial-hotspot:hover .hotspot-popover, .active-pulse .hotspot-popover { opacity: 1; transform: translateX(0); }
          `}} />

        </div>
      </div>

      {/* RIGHT COLUMN: MEDIXR BRANDED MISSION CONTENT */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '22px', textAlign: 'left' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#3B72F2', letterSpacing: '0.1em' }}>{currentAsset.tag}</div>
        <h1 style={{ fontSize: '52px', fontWeight: '800', lineHeight: '1.15', color: '#002159', letterSpacing: '-0.02em' }}>
          Training One Million <br /> Medical Specialists <br /> via Spatial Labs.
        </h1>
        <p style={{ color: '#49769F', fontSize: '15px', lineHeight: '1.6', maxWidth: '460px' }}>
          {currentAsset.desc}
        </p>
        <button style={{ width: 'fit-content', backgroundColor: '#002159', color: '#ffffff', fontWeight: '600', fontSize: '13px', padding: '14px 28px', borderRadius: '9999px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,33,89,0.15)', marginTop: '8px' }}>
          Initialize Simulations ➔
        </button>
      </div>

    </div>
  );
}