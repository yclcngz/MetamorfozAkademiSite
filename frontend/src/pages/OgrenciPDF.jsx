import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaMedal, FaBook, FaGraduationCap, FaArrowRight } from 'react-icons/fa';

const CATEGORIES = [
  { id: 'lgs',  label: 'LGS',       icon: FaMedal,         color: '#6366f1', bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.5)',  group: 'Sınav Grubu' },
  { id: '9',    label: '9. Sınıf',  icon: FaBook,          color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.5)',  group: 'Ara Sınıf' },
  { id: '10',   label: '10. Sınıf', icon: FaBook,          color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.5)',  group: 'Ara Sınıf' },
  { id: '11',   label: '11. Sınıf', icon: FaBook,          color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.5)',  group: 'Ara Sınıf' },
  { id: '12',   label: '12. Sınıf', icon: FaBook,          color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.5)',  group: 'Ara Sınıf' },
  { id: 'tyt',  label: 'TYT',       icon: FaGraduationCap, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.5)',  group: 'Sınav Grubu' },
  { id: 'ayt',  label: 'AYT',       icon: FaGraduationCap, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.5)',  group: 'Sınav Grubu' },
  { id: 'dgs',  label: 'DGS',       icon: FaGraduationCap, color: '#ec4899', bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.5)',  group: 'Sınav Grubu' },
  { id: 'kpss', label: 'KPSS',      icon: FaGraduationCap, color: '#ec4899', bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.5)',  group: 'Sınav Grubu' },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  /* ─── Hero section (açık) ─── */
  .op-hero-section {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #ffffff;
    position: relative; overflow: hidden;
    padding: 3rem 1.5rem 2.5rem;
  }

  /* ─── Content section (açık) ─── */
  .op-content-section {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f1f5f9;
    padding: 3rem 1.5rem 5rem;
  }

  /* ─── Wave divider ─── */
  .op-wave {
    display: block; width: 100%; overflow: hidden; line-height: 0; margin-top: -2px;
  }
  .op-wave svg { display: block; width: 100%; }

  .op-grid-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 80%);
  }
  .op-orb-1 {
    position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 65%);
    top: -150px; right: -150px;
    animation: op-drift 16s ease-in-out infinite;
  }
  .op-orb-2 {
    position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%);
    bottom: -100px; left: -100px;
    animation: op-drift 12s ease-in-out infinite reverse;
    animation-delay: -4s;
  }
  @keyframes op-drift {
    0%,100% { transform: translate(0,0); }
    50%      { transform: translate(20px,-15px); }
  }

  .op-inner {
    position: relative; z-index: 1;
    max-width: 860px; margin: 0 auto;
  }

  .op-hero {
    text-align: center; margin-bottom: 3rem;
    animation: op-in 0.7s ease both;
  }
  @keyframes op-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .op-pill {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.09); border: 1px solid rgba(245,158,11,0.2);
    border-radius: 100px; padding: 5px 14px 5px 10px;
    font-size: 11px; color: #f59e0b; letter-spacing: 0.14em;
    text-transform: uppercase; font-weight: 600; margin-bottom: 1.2rem;
  }
  .op-pill-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #f59e0b;
    box-shadow: 0 0 7px rgba(245,158,11,0.9);
    animation: op-dot 2s ease-in-out infinite;
  }
  @keyframes op-dot {
    0%,100% { opacity: 1; } 50% { opacity: 0.3; }
  }

  .op-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 700; letter-spacing: -0.025em;
    color: #0f172a; line-height: 1; margin: 0 0 0.75rem;
  }
  .op-title-gold {
    background: linear-gradient(135deg, #f59e0b 0%, #fde68a 45%, #f59e0b 75%, #b45309 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .op-subtitle {
    font-size: 0.92rem; color: #64748b; line-height: 1.6; max-width: 400px; margin: 0 auto;
  }

  /* Groups */
  .op-group-label {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: #64748b;
    margin: 0 0 0.85rem; display: flex; align-items: center; gap: 10px;
  }
  .op-group-label::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, rgba(6,182,212,0.3), transparent);
  }

  .op-section { margin-bottom: 2.5rem; animation: op-in 0.7s ease 0.1s both; }

  .op-grid {
    display: grid; gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 560px) { .op-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 800px) { .op-grid { grid-template-columns: repeat(5, 1fr); } }

  .op-card {
    position: relative;
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center; gap: 0.75rem;
    padding: 1.6rem 0.75rem 1.4rem;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    text-decoration: none; overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .op-card::after {
    content: ''; position: absolute; inset: 0; border-radius: 18px;
    background: var(--card-shine); opacity: 0; transition: opacity 0.3s; pointer-events: none;
  }
  .op-card:hover::after { opacity: 1; }
  .op-card:hover {
    transform: translateY(-8px) scale(1.04);
    border-color: var(--card-border);
    box-shadow: var(--card-shadow);
  }

  .op-card-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    position: relative; z-index: 1;
  }
  .op-card:hover .op-card-icon { transform: scale(1.14) rotate(-5deg); }

  .op-card-label {
    font-size: 0.88rem; font-weight: 600; color: #334155;
    position: relative; z-index: 1; transition: color 0.2s;
  }
  .op-card:hover .op-card-label { color: #0f172a; }

  .op-card-arrow {
    font-size: 0.65rem; color: var(--card-color);
    opacity: 0; transform: translateY(4px);
    transition: opacity 0.2s, transform 0.2s;
    position: relative; z-index: 1;
  }
  .op-card:hover .op-card-arrow { opacity: 1; transform: translateY(0); }
`;

const sinav = CATEGORIES.filter((c) => c.group === 'Sınav Grubu');
const ara   = CATEGORIES.filter((c) => c.group === 'Ara Sınıf');

export default function OgrenciPDF() {
  return (
    <>
      <style>{STYLES}</style>
      <Helmet>
        <title>Öğrenci PDF Kaynakları — Metamorfoz Akademisi</title>
        <meta name="description" content="LGS, TYT, AYT, DGS, KPSS ve 9-12. sınıf öğrencilerine özel PDF kaynakları. Deneme sınavları, konu anlatımı ve soru bankaları Metamorfoz Akademisi'nde." />
      </Helmet>

      {/* ── Koyu Hero Bölümü ── */}
      <div className="op-hero-section">
        <div className="op-grid-bg" />
        <div className="op-orb-1" />
        <div className="op-orb-2" />
        <div className="op-inner">
          <div className="op-hero">
            <div className="op-pill"><span className="op-pill-dot" />PDF Kaynakları</div>
            <h1 className="op-title">
              Öğrenci <span className="op-title-gold">PDF</span>
            </h1>
            <p className="op-subtitle">
              Sınıf veya sınav grubunu seç, materyallere ulaş.
            </p>
          </div>
        </div>
      </div>

      {/* ── Dalga Geçiş ── */}
      <div className="op-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f1f5f9" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* ── Açık İçerik Bölümü ── */}
      <div className="op-content-section">
        <div className="op-inner">
          <div className="op-section">
            <p className="op-group-label">Sınav Grupları</p>
            <div className="op-grid">
              {sinav.map((cat) => <CatCard key={cat.id} cat={cat} />)}
            </div>
          </div>
          <div className="op-section">
            <p className="op-group-label">Ara Sınıflar</p>
            <div className="op-grid">
              {ara.map((cat) => <CatCard key={cat.id} cat={cat} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CatCard({ cat }) {
  const Icon = cat.icon;
  return (
    <Link
      to={`/ogrenci-pdf/${cat.id}`}
      className="op-card"
      style={{
        '--card-color':  cat.color,
        '--card-shine':  `radial-gradient(ellipse at 50% 0%, ${cat.bg} 0%, transparent 65%)`,
        '--card-border': cat.border,
        '--card-shadow': `0 16px 40px ${cat.bg}, 0 4px 14px rgba(0,0,0,0.4)`,
      }}
    >
      <div className="op-card-icon" style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
        <Icon style={{ color: cat.color, fontSize: '1.4rem' }} />
      </div>
      <div className="op-card-label">{cat.label}</div>
      <FaArrowRight className="op-card-arrow" />
    </Link>
  );
}
