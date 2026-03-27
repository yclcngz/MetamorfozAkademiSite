import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaChalkboardTeacher, FaFilePdf, FaBookOpen, FaVolumeUp, FaVolumeMute, FaDownload, FaArrowRight } from 'react-icons/fa';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; }

  .home-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    background: #f8fafc;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4.5rem 1.5rem 3rem;
  }

  /* ─── Background ─── */
  .home-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(245,158,11,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,158,11,0.035) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
  }

  .orb {
    position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;
  }
  .orb-1 {
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 65%);
    top: -280px; right: -200px;
    animation: orb-drift 14s ease-in-out infinite;
  }
  .orb-2 {
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 65%);
    bottom: -200px; left: -180px;
    animation: orb-drift 18s ease-in-out infinite reverse;
    animation-delay: -5s;
  }
  .orb-3 {
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%);
    top: 55%; left: 8%;
    animation: orb-drift 11s ease-in-out infinite;
    animation-delay: -8s;
  }
  @keyframes orb-drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(40px, -30px) scale(1.06); }
    66%       { transform: translate(-25px, 40px) scale(0.94); }
  }

  /* ─── Logo ─── */
  .logo-corner {
    position: absolute; top: 1.75rem; right: 1.75rem; z-index: 10;
    opacity: 0.85; transition: opacity 0.2s;
  }
  .logo-corner:hover { opacity: 1; }
  .logo-corner img { width: 46px; height: 46px; object-fit: contain; }

  /* ─── Main layout ─── */
  .home-layout {
    position: relative; z-index: 2;
    width: 100%; max-width: 1160px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
  }
  @media (min-width: 900px) {
    .home-layout { grid-template-columns: 1fr 1fr; gap: 3.5rem; }
  }

  /* ─── Left: video column ─── */
  .home-left {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    animation: hero-in 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes hero-in {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Hero text */
  .hero-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(245,158,11,0.09);
    border: 1px solid rgba(245,158,11,0.22);
    border-radius: 100px; padding: 5px 15px 5px 10px;
    font-size: 11px; color: #f59e0b; letter-spacing: 0.14em;
    text-transform: uppercase; font-weight: 600; width: fit-content;
  }
  .hero-pill-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #f59e0b;
    box-shadow: 0 0 8px rgba(245,158,11,0.9);
    animation: dot-pulse 2.2s ease-in-out infinite;
  }
  @keyframes dot-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.75); }
  }

  .hero-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: clamp(3rem, 6vw, 5rem);
    line-height: 0.93;
    letter-spacing: -0.025em;
    color: #0f172a;
    margin: 0;
  }
  .hero-gold {
    background: linear-gradient(135deg, #f59e0b 0%, #fde68a 45%, #f59e0b 75%, #b45309 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    display: inline-block; position: relative;
  }
  .hero-gold::after {
    content: ''; position: absolute; left: 4%; right: 4%; bottom: 2px; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent);
    border-radius: 2px; animation: line-shimmer 3s ease-in-out infinite;
  }
  @keyframes line-shimmer {
    0%, 100% { opacity: 0.3; transform: scaleX(0.6); }
    50%       { opacity: 1;   transform: scaleX(1); }
  }

  .hero-rule {
    width: 44px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(245,158,11,0.55), transparent);
    border: none; margin: 0;
  }
  .hero-sub {
    font-size: 0.93rem; color: #64748b;
    font-weight: 400; line-height: 1.65; letter-spacing: 0.01em; margin: 0;
  }

  /* ─── Video card ─── */
  .video-card {
    position: relative; border-radius: 20px; overflow: hidden;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
    aspect-ratio: 16/9;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .video-card:hover {
    border-color: rgba(245,158,11,0.4);
    box-shadow: 0 12px 48px rgba(245,158,11,0.1), 0 8px 32px rgba(0,0,0,0.1);
  }

  .video-card video {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }

  /* Video overlay gradient */
  .video-overlay {
    position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(
      to top,
      rgba(6,8,15,0.55) 0%,
      transparent 40%,
      transparent 70%,
      rgba(6,8,15,0.25) 100%
    );
    border-radius: 20px;
  }

  /* Sound button */
  .sound-btn {
    position: absolute; bottom: 12px; right: 12px; z-index: 5;
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(10,14,26,0.75);
    border: 1px solid rgba(245,158,11,0.3);
    color: #f59e0b; font-size: 14px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; backdrop-filter: blur(8px);
    transition: background 0.2s, transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  }
  .sound-btn:hover {
    background: rgba(245,158,11,0.15);
    border-color: rgba(245,158,11,0.6);
    transform: scale(1.1);
    box-shadow: 0 0 16px rgba(245,158,11,0.3);
  }
  .sound-btn.active {
    background: rgba(245,158,11,0.2);
    border-color: rgba(245,158,11,0.7);
    box-shadow: 0 0 20px rgba(245,158,11,0.35);
  }

  /* Sound label */
  .sound-label {
    position: absolute; bottom: 14px; right: 58px; z-index: 5;
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(245,158,11,0.85);
    background: rgba(10,14,26,0.7); border: 1px solid rgba(245,158,11,0.2);
    padding: 4px 9px; border-radius: 6px; backdrop-filter: blur(6px);
    opacity: 0; transform: translateX(6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    pointer-events: none; white-space: nowrap;
  }
  .video-card:hover .sound-label { opacity: 1; transform: translateX(0); }

  /* Video badge */
  .video-badge {
    position: absolute; top: 12px; left: 12px; z-index: 5;
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(245,158,11,0.9);
    background: rgba(6,8,15,0.7); border: 1px solid rgba(245,158,11,0.2);
    padding: 4px 10px; border-radius: 6px; backdrop-filter: blur(6px);
    display: flex; align-items: center; gap: 6px;
  }
  .video-badge-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #f59e0b;
    box-shadow: 0 0 6px rgba(245,158,11,0.9);
    animation: dot-pulse 1.8s ease-in-out infinite;
  }

  /* ─── Right: cards column ─── */
  .home-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: cards-in 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }
  @keyframes cards-in {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cards-label {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: rgba(100,116,139,0.7);
    margin-bottom: 0.25rem;
  }

  /* ─── Nav card ─── */
  .nav-card {
    position: relative;
    display: flex; align-items: center; gap: 1rem;
    text-decoration: none;
    padding: 1.3rem 1.5rem;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease;
  }
  .nav-card::after {
    content: ''; position: absolute; inset: 0; border-radius: 18px;
    background: var(--card-shine); opacity: 0; transition: opacity 0.35s ease; pointer-events: none;
  }
  .nav-card:hover::after { opacity: 1; }
  .nav-card:hover {
    transform: translateX(6px) scale(1.015);
    border-color: var(--card-border);
    box-shadow: var(--card-shadow);
  }

  .card-icon {
    flex-shrink: 0; width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    background: var(--icon-bg); border: 1px solid var(--icon-border);
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    position: relative; z-index: 1;
  }
  .nav-card:hover .card-icon {
    transform: scale(1.12) rotate(-4deg);
    box-shadow: 0 6px 24px var(--icon-glow);
  }
  .card-icon svg { width: 22px; height: 22px; color: var(--icon-color); }

  .card-body { flex: 1; position: relative; z-index: 1; }
  .card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-weight: 700; letter-spacing: -0.01em;
    color: #1e293b; margin-bottom: 0.25rem;
    transition: color 0.2s;
  }
  .nav-card:hover .card-name { color: #0f172a; }
  .card-desc { font-size: 0.78rem; color: #64748b; line-height: 1.5; }

  .card-arrow {
    flex-shrink: 0; position: relative; z-index: 1;
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.08);
    color: var(--icon-color); font-size: 13px;
    opacity: 0; transform: translateX(-4px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .nav-card:hover .card-arrow { opacity: 1; transform: translateX(0); }

  /* ─── Announcement card ─── */
  @keyframes led-pulse {
    0%, 100% {
      box-shadow:
        0 0 0 0 rgba(220,38,38,0),
        0 0 8px 2px rgba(220,38,38,0.55),
        0 0 18px 4px rgba(220,38,38,0.3);
      border-color: rgba(220,38,38,0.55);
    }
    50% {
      box-shadow:
        0 0 0 5px rgba(220,38,38,0.08),
        0 0 22px 8px rgba(220,38,38,0.5),
        0 0 48px 14px rgba(220,38,38,0.2);
      border-color: rgba(239,68,68,0.9);
    }
  }
  .announce-card {
    position: relative; overflow: hidden;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(245,158,11,0.08) 60%, rgba(180,83,9,0.05) 100%);
    border: 1px solid rgba(220,38,38,0.55);
    padding: 1.2rem 1.4rem;
    animation: cards-in 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s both, led-pulse 2s ease-in-out 1.3s infinite;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    cursor: default;
  }
  .announce-card:hover {
    transform: scale(1.045);
  }
  .announce-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #ef4444, #f97316, #f59e0b, transparent);
    border-radius: 18px 18px 0 0;
  }
  .announce-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(249,115,22,0.18); border: 1px solid rgba(249,115,22,0.4);
    border-radius: 100px; padding: 3px 10px 3px 8px;
    font-size: 0.62rem; color: #fb923c; letter-spacing: 0.13em;
    text-transform: uppercase; font-weight: 700; margin-bottom: 0.65rem;
  }
  .announce-badge-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #f97316;
    box-shadow: 0 0 7px rgba(249,115,22,0.9);
    animation: dot-pulse 2s ease-in-out infinite;
  }
  .announce-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem; font-weight: 700; color: #0f172a;
    line-height: 1.25; margin-bottom: 0.35rem;
  }
  .announce-desc {
    font-size: 0.75rem; color: #64748b;
    line-height: 1.5; margin-bottom: 0.9rem;
  }
  .announce-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 0.55rem 1.1rem;
    background: linear-gradient(135deg, #f97316 0%, #ea6d1f 100%);
    color: #fff; font-weight: 700; font-size: 0.78rem;
    border-radius: 10px; text-decoration: none;
    box-shadow: 0 4px 16px rgba(249,115,22,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    white-space: nowrap;
  }
  .announce-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 22px rgba(249,115,22,0.55);
  }
  .announce-btn-free {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 0.5rem 0.9rem;
    background: transparent;
    color: rgba(251,146,60,0.85); font-weight: 600; font-size: 0.73rem;
    border: 1px solid rgba(249,115,22,0.3); border-radius: 10px;
    text-decoration: none; margin-left: 0.5rem;
    transition: all 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    white-space: nowrap;
  }
  .announce-btn-free:hover {
    background: rgba(249,115,22,0.1);
    border-color: rgba(249,115,22,0.5);
    color: #fb923c;
  }
  .announce-actions {
    display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem;
  }

  /* ─── Price tag ─── */
  .price-tag {
    position: absolute; top: 1rem; right: 1.1rem;
    display: flex; flex-direction: column; align-items: flex-end;
  }
  .price-tag-label {
    font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(148,163,184,0.55);
    margin-bottom: 1px; line-height: 1;
  }
  .price-tag-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem; font-weight: 700; line-height: 1;
  }
  .price-tag-value.tyt {
    background: linear-gradient(135deg, #bfdbfe 0%, #60a5fa 55%, #2563eb 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(59,130,246,0.5));
  }
  .price-tag-value.ayt {
    background: linear-gradient(135deg, #a7f3d0 0%, #34d399 55%, #059669 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(16,185,129,0.5));
  }
  .price-tag-currency {
    font-size: 0.7rem; font-weight: 700; vertical-align: super;
    filter: none;
    margin-right: 1px;
  }
  .price-tag-old {
    font-size: 0.7rem; font-weight: 600; color: rgba(148,163,184,0.45);
    text-decoration: line-through; line-height: 1; margin-bottom: 1px;
    text-align: right;
  }
  .price-tag-discount {
    font-size: 0.58rem; font-weight: 700; letter-spacing: 0.06em;
    color: #f87171; background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 5px; padding: 1px 5px;
    display: inline-block; margin-bottom: 2px;
  }

  /* ─── Bottom hint ─── */
  .home-hint {
    position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
    z-index: 2; font-size: 0.7rem; color: rgba(100,116,139,0.5);
    letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
    animation: cards-in 1s ease 0.55s both;
  }
`;

const CARDS = [
  {
    to: '/ozel-ders',
    Icon: FaChalkboardTeacher,
    title: 'Özel Ders Al',
    desc: 'Sınıf düzeyine özel birebir ders talep et',
    vars: {
      '--card-shine':  'radial-gradient(ellipse at 0% 50%, rgba(245,158,11,0.1) 0%, transparent 55%)',
      '--card-border': 'rgba(245,158,11,0.35)',
      '--card-shadow': '0 16px 50px rgba(245,158,11,0.14), 0 4px 16px rgba(0,0,0,0.08)',
      '--icon-bg':     'rgba(245,158,11,0.1)',
      '--icon-border': 'rgba(245,158,11,0.22)',
      '--icon-color':  '#f59e0b',
      '--icon-glow':   'rgba(245,158,11,0.35)',
    },
  },
  {
    to: '/ogretmen-pdf',
    Icon: FaFilePdf,
    title: 'Öğretmen PDF',
    desc: 'Ders anlatım ve sunum materyalleri',
    vars: {
      '--card-shine':  'radial-gradient(ellipse at 0% 50%, rgba(99,102,241,0.1) 0%, transparent 55%)',
      '--card-border': 'rgba(99,102,241,0.35)',
      '--card-shadow': '0 16px 50px rgba(99,102,241,0.14), 0 4px 16px rgba(0,0,0,0.08)',
      '--icon-bg':     'rgba(99,102,241,0.1)',
      '--icon-border': 'rgba(99,102,241,0.22)',
      '--icon-color':  '#818cf8',
      '--icon-glow':   'rgba(99,102,241,0.35)',
    },
  },
  {
    to: '/ogrenci-pdf',
    Icon: FaBookOpen,
    title: 'Öğrenci PDF',
    desc: 'Konu özeti, soru bankası ve denemeler',
    vars: {
      '--card-shine':  'radial-gradient(ellipse at 0% 50%, rgba(16,185,129,0.1) 0%, transparent 55%)',
      '--card-border': 'rgba(16,185,129,0.35)',
      '--card-shadow': '0 16px 50px rgba(16,185,129,0.14), 0 4px 16px rgba(0,0,0,0.08)',
      '--icon-bg':     'rgba(16,185,129,0.1)',
      '--icon-border': 'rgba(16,185,129,0.22)',
      '--icon-color':  '#34d399',
      '--icon-glow':   'rgba(16,185,129,0.35)',
    },
  },
];

export default function Home() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // PiP'ten çıkınca video donmasın
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onLeavePip = () => { vid.play().catch(() => {}); };
    vid.addEventListener('leavepictureinpicture', onLeavePip);
    return () => vid.removeEventListener('leavepictureinpicture', onLeavePip);
  }, []);

  const toggleSound = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <>
      <Helmet>
        <title>Metamorfoz Akademisi | Özel Ders, LGS, TYT, AYT PDF Kaynakları</title>
        <meta name="description" content="LGS, TYT, AYT, DGS, KPSS hazırlık PDF kaynakları, özel ders ve öğretmen materyalleri. Van, Ankara, İstanbul, Yalova, Trabzon yüz yüze — Türkiye'nin her yerine online." />
        <link rel="canonical" href="https://metamorfozakademi.com" />
      </Helmet>
      <style>{STYLES}</style>
      <div className="home-root">
        <div className="home-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="logo-corner">
          <img
            src="/logo.png"
            alt="Metamorfoz Akademisi"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="home-layout">
          {/* ── Sol: video + başlık ── */}
          <div className="home-left">
            {/* Hero text */}
            <div>
              <div className="hero-pill">
                <span className="hero-pill-dot" />
                Eğitimde Dönüşüm
              </div>
              <h1 className="hero-h1" style={{ marginTop: '0.9rem' }}>
                <span className="hero-gold">Metamorfoz</span>
                <br />
                Akademisi
              </h1>
              <hr className="hero-rule" style={{ margin: '1.1rem 0 0.9rem' }} />
              <p className="hero-sub">
                Öğrenciden öğretmene — her adımda profesyonel eğitim kaynakları
              </p>
            </div>

            {/* Video */}
            <div className="video-card">
              <video
                ref={videoRef}
                src="/hosgeldiniz.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ borderRadius: 20 }}
              />
              <div className="video-overlay" />

              <div className="video-badge">
                <span className="video-badge-dot" />
                Hoş Geldiniz
              </div>

              <span className="sound-label">{muted ? 'Sesi Aç' : 'Sesi Kapat'}</span>

              <button
                className={`sound-btn${!muted ? ' active' : ''}`}
                onClick={toggleSound}
                aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
              >
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
          </div>

          {/* ── Sağ: kartlar ── */}
          <div className="home-right">
            <p className="cards-label">Hizmetlerimiz</p>
            {CARDS.map((c) => (
              <NavCard key={c.to} card={c} />
            ))}

            {/* TYT Duyuru */}
            <div className="announce-card">
              <div className="price-tag">
                <span className="price-tag-discount">🔥 -%25</span>
                <span className="price-tag-old">₺199,9</span>
                <span className="price-tag-value tyt">
                  <span className="price-tag-currency" style={{ WebkitTextFillColor: '#60a5fa' }}>₺</span>149<span style={{ fontSize: '0.9rem' }}>,99</span>
                </span>
              </div>
              <div className="announce-badge">
                <span className="announce-badge-dot" />
                Yeni Ürün
              </div>
              <div className="announce-title">TYT Matematik Çıkmış Karma 7'li Set</div>
              <div className="announce-desc">
                ÖSYM çıkmış sorularından derlenen 7 adet bölüm denemesi. Deneme 1 ücretsiz!
              </div>
              <div className="announce-actions">
                <Link to="/ogrenci-pdf/tyt/cikmis-karma-pdf-set" className="announce-btn">
                  <FaArrowRight style={{ fontSize: '0.7rem' }} />
                  İncele & Satın Al
                </Link>
                <a
                  href="/2026-TYT-Mat-Deneme-1.pdf"
                  download="TYT-Matematik-Deneme-1.pdf"
                  className="announce-btn-free"
                >
                  <FaDownload style={{ fontSize: '0.65rem' }} />
                  Ücretsiz Dene
                </a>
              </div>
            </div>

            {/* AYT Duyuru */}
            <div className="announce-card" style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(217,119,6,0.08) 60%, rgba(120,53,15,0.05) 100%)',
            }}>
              <div className="price-tag">
                <span className="price-tag-discount">🔥 -%25</span>
                <span className="price-tag-old">₺199,9</span>
                <span className="price-tag-value ayt">
                  <span className="price-tag-currency" style={{ WebkitTextFillColor: '#34d399' }}>₺</span>149<span style={{ fontSize: '0.9rem' }}>,99</span>
                </span>
              </div>
              <div className="announce-badge" style={{
                background: 'rgba(245,158,11,0.18)',
                borderColor: 'rgba(245,158,11,0.4)',
                color: '#fbbf24',
              }}>
                <span className="announce-badge-dot" style={{ background: '#f59e0b', boxShadow: '0 0 7px rgba(245,158,11,0.9)' }} />
                Yeni Ürün
              </div>
              <div className="announce-title">AYT Matematik Çıkmış Karma 7'li Set</div>
              <div className="announce-desc">
                ÖSYM çıkmış sorularından derlenen 7 × 40 soruluk bölüm denemesi. Deneme 1 ücretsiz!
              </div>
              <div className="announce-actions">
                <Link to="/ogrenci-pdf/ayt/cikmis-karma-pdf-set" className="announce-btn" style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
                  color: '#06080f',
                }}>
                  <FaArrowRight style={{ fontSize: '0.7rem' }} />
                  İncele & Satın Al
                </Link>
                <a
                  href="/2026-AYT-Mat-Deneme-1.pdf"
                  download="AYT-Matematik-Deneme-1.pdf"
                  className="announce-btn-free"
                  style={{ borderColor: 'rgba(245,158,11,0.3)', color: 'rgba(251,191,36,0.85)' }}
                >
                  <FaDownload style={{ fontSize: '0.65rem' }} />
                  Ücretsiz Dene
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="home-hint">Metamorfoz Akademisi © 2025</p>
      </div>
    </>
  );
}

function NavCard({ card }) {
  const { to, Icon, title, desc, vars } = card;
  return (
    <Link to={to} className="nav-card" style={vars}>
      <div className="card-icon"><Icon /></div>
      <div className="card-body">
        <div className="card-name">{title}</div>
        <div className="card-desc">{desc}</div>
      </div>
      <div className="card-arrow">→</div>
    </Link>
  );
}
