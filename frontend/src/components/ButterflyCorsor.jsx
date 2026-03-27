import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Butterfly SVG ─── */
function ButterflyShape({ fast }) {
  const dur = fast ? '0.07s' : '0.32s';

  const leftStyle = {
    transformBox: 'fill-box',
    transformOrigin: 'right center',
    animation: `bf-wing-l ${dur} ease-in-out infinite alternate`,
  };
  const rightStyle = {
    transformBox: 'fill-box',
    transformOrigin: 'left center',
    animation: `bf-wing-r ${dur} ease-in-out infinite alternate`,
  };

  return (
    <svg
      width="52"
      height="48"
      viewBox="0 0 52 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.55))' }}
    >
      {/* ── Sol kanatlar ── */}
      <g style={leftStyle}>
        {/* sol üst kanat */}
        <path
          d="M26 20 C22 11 10 4 3 8 C-2 13 8 24 26 25 Z"
          fill="url(#wl1)"
          opacity="0.93"
        />
        {/* sol alt kanat */}
        <path
          d="M26 25 C17 28 6 34 8 41 C10 46 21 42 26 32 Z"
          fill="url(#wl2)"
          opacity="0.88"
        />
        {/* sol üst kanat damar */}
        <path d="M26 21 C19 13 9 7 4 9" stroke="rgba(180,83,9,0.35)" strokeWidth="0.7" fill="none" />
        <path d="M26 22 C15 18 6 18 3 10" stroke="rgba(180,83,9,0.2)" strokeWidth="0.5" fill="none" />
      </g>

      {/* ── Sağ kanatlar ── */}
      <g style={rightStyle}>
        {/* sağ üst kanat */}
        <path
          d="M26 20 C30 11 42 4 49 8 C54 13 44 24 26 25 Z"
          fill="url(#wr1)"
          opacity="0.93"
        />
        {/* sağ alt kanat */}
        <path
          d="M26 25 C35 28 46 34 44 41 C42 46 31 42 26 32 Z"
          fill="url(#wr2)"
          opacity="0.88"
        />
        {/* sağ üst kanat damar */}
        <path d="M26 21 C33 13 43 7 48 9" stroke="rgba(180,83,9,0.35)" strokeWidth="0.7" fill="none" />
        <path d="M26 22 C37 18 46 18 49 10" stroke="rgba(180,83,9,0.2)" strokeWidth="0.5" fill="none" />
      </g>

      {/* ── Vücut ── */}
      <ellipse cx="26" cy="26" rx="2.2" ry="8.5" fill="#92400e" />
      {/* Baş */}
      <circle cx="26" cy="17" r="2.2" fill="#78350f" />

      {/* ── Antenler ── */}
      <path d="M25 16 C22 10 18 5 15 2" stroke="#a16207" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M27 16 C30 10 34 5 37 2" stroke="#a16207" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <circle cx="15" cy="2" r="1.6" fill="#d97706" />
      <circle cx="37" cy="2" r="1.6" fill="#d97706" />

      {/* ── Gradyanlar ── */}
      <defs>
        <radialGradient id="wl1" cx="40%" cy="40%" r="65%">
          <stop offset="0%"  stopColor="#fde68a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="wl2" cx="55%" cy="35%" r="65%">
          <stop offset="0%"  stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id="wr1" cx="60%" cy="40%" r="65%">
          <stop offset="0%"  stopColor="#fde68a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="wr2" cx="45%" cy="35%" r="65%">
          <stop offset="0%"  stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── Ses: Web Audio API ile kanat sesi ─── */
function useWingSound() {
  const ctxRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window['webkitAudioContext'];
      ctxRef.current = new AudioCtx();
    }
    return ctxRef.current;
  };

  return useCallback(() => {
    try {
      const ctx = getCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const dur = 0.14;

      // Kısa gürültü patlama (kanat sesi)
      const bufLen = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(2, bufLen, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        for (let i = 0; i < bufLen; i++) {
          const t = i / bufLen;
          d[i] = (Math.random() * 2 - 1) * Math.exp(-t * 12) * (1 - t);
        }
      }

      const src = ctx.createBufferSource();
      src.buffer = buf;

      // Bandpass filtre — kanat frekansı
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(1800, now);
      bp.frequency.exponentialRampToValueAtTime(600, now + dur);
      bp.Q.value = 1.8;

      // Yüksek geçiş — düşük gürültüyü kes
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 400;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      src.connect(bp);
      bp.connect(hp);
      hp.connect(gain);
      gain.connect(ctx.destination);
      src.start(now);
    } catch (_) {}
  }, []);
}

/* ─── CSS animasyonları ─── */
const GLOBAL_CSS = `
  body.butterfly-active,
  body.butterfly-active * {
    cursor: none !important;
  }

  @keyframes bf-wing-l {
    from { transform: scaleX(1); }
    to   { transform: scaleX(0.12); }
  }
  @keyframes bf-wing-r {
    from { transform: scaleX(1); }
    to   { transform: scaleX(0.12); }
  }
`;

/* ─── Ana bileşen ─── */
export default function ButterflyCorsor() {
  const wrapRef   = useRef(null);   // doğrudan DOM erişimi
  const svgRef    = useRef(null);   // SVG wrapper
  const lastX     = useRef(0);
  const fastTimer = useRef(null);
  const rafRef    = useRef(null);
  const curPos    = useRef({ x: -300, y: -300 });

  const [fast, setFast] = useState(false);
  const playWing = useWingSound();

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = wrapRef.current;
    if (!el) return;

    // Pozisyonu direkt DOM'a yaz — React state yok, gecikme yok
    const onMove = (e) => {
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      curPos.current = { x: e.clientX, y: e.clientY };

      // Hafif eğim
      const tilt = Math.max(-16, Math.min(16, dx * 1.6));

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.left      = e.clientX + 'px';
        el.style.top       = e.clientY + 'px';
        el.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;
        el.style.opacity   = '1';
      });
    };

    const onLeave = () => { el.style.opacity = '0'; };
    const onEnter = () => { el.style.opacity = '1'; };

    const onClick = () => {
      playWing();
      setFast(true);
      clearTimeout(fastTimer.current);
      fastTimer.current = setTimeout(() => setFast(false), 380);
    };

    // Tab'a geri dönünce cursor:none sıfırlanmasını önle
    const onResume = () => {
      document.body.classList.add('butterfly-active');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onResume);
    window.addEventListener('focus', onResume);
    document.body.classList.add('butterfly-active');

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onResume);
      window.removeEventListener('focus', onResume);
      document.body.classList.remove('butterfly-active');
      clearTimeout(fastTimer.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playWing]);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {/* Başlangıçta ekran dışında, opacity:0 */}
      <div
        ref={wrapRef}
        style={{
          position: 'fixed',
          left: '-300px',
          top:  '-300px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: 0,
          willChange: 'left, top, transform',
          transition: 'opacity 0.2s ease',
        }}
      >
        <div ref={svgRef}>
          <ButterflyShape fast={fast} />
        </div>
      </div>
    </>
  );
}
