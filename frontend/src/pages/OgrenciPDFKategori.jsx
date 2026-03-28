import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  FaMedal, FaBook, FaGraduationCap, FaFileAlt, FaVideo,
  FaQuestionCircle, FaClipboardList, FaPencilAlt,
  FaChevronLeft, FaChevronDown, FaArrowRight, FaLayerGroup,
} from 'react-icons/fa';

// ─── Kategori tanımları ───
const CATEGORY_MAP = {
  lgs:  { label: 'LGS',       icon: FaMedal,        color: '#6366f1', bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.4)',  group: 'sinav' },
  '9':  { label: '9. Sınıf',  icon: FaBook,         color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)',  group: 'ara' },
  '10': { label: '10. Sınıf', icon: FaBook,         color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)',  group: 'ara' },
  '11': { label: '11. Sınıf', icon: FaBook,         color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)',  group: 'ara' },
  '12': { label: '12. Sınıf', icon: FaBook,         color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)',  group: 'ara' },
  tyt:  { label: 'TYT',       icon: FaGraduationCap, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)',  group: 'sinav' },
  ayt:  { label: 'AYT',       icon: FaGraduationCap, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)',  group: 'sinav' },
  dgs:  { label: 'DGS',       icon: FaGraduationCap, color: '#ec4899', bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.4)',  group: 'sinav' },
  kpss: { label: 'KPSS',      icon: FaGraduationCap, color: '#ec4899', bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.4)',  group: 'sinav' },
};

// ─── İçerik tanımları ───
const ARA_SUBJECTS = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Edebiyat', 'Tarih', 'Coğrafya'];

const ARA_ITEMS = [
  { label: 'Ders Notları',    icon: FaFileAlt,        color: '#6366f1', desc: 'Konuları özetleyen ders notu PDF\'leri' },
  { label: 'Soru Bankası',    icon: FaQuestionCircle, color: '#f59e0b', desc: 'Konu bazlı soru havuzu' },
  { label: 'Yazılı Soruları', icon: FaPencilAlt,      color: '#10b981', desc: 'Geçmiş yıl yazılı sınav soruları' },
  { label: 'Denemeler',       icon: FaClipboardList,  color: '#ec4899', desc: 'Tam ve bölüm denemeleri' },
];

const SINAV_ITEMS = [
  { label: 'Konu Özet PDF',       icon: FaFileAlt,        color: '#6366f1', desc: 'Sınavda çıkan tüm konuların özet PDF\'leri' },
  { label: 'Soru Bankası',        icon: FaQuestionCircle, color: '#f59e0b', desc: 'Yıllara göre sınıflandırılmış sorular' },
  { label: 'Denemeler',           icon: FaClipboardList,  color: '#ec4899', desc: 'Gerçek sınav formatında denemeler', expandable: true },
  { label: 'Konu Özet Videoları', icon: FaVideo,          color: '#10b981', desc: 'Hızlı tekrar için konu anlatım videoları' },
];

const TYT_DENEME_FOLDERS = {
  root: {
    title: 'Deneme türü seçin',
    items: [
      { label: 'TYT Genel Deneme',           icon: FaClipboardList, color: '#f59e0b', desc: 'Tüm alan sorularını kapsayan tam TYT denemesi' },
      { label: 'TYT Bölüm Denemesi',         icon: FaPencilAlt,     color: '#ec4899', desc: 'Derslere göre ayrılmış bölüm denemeleri', folderId: 'bolum' },
    ]
  },
  bolum: {
    title: 'Bölüm Denemesi',
    items: [
      { label: 'Matematik PDF Set', icon: FaLayerGroup, color: '#3b82f6', desc: 'Matematik branşına özel denemeler', folderId: 'mat' },
      { label: 'Türkçe PDF Set',    icon: FaLayerGroup, color: '#ef4444', desc: 'Türkçe branşına özel denemeler' },
      { label: 'Sosyal Bilimler PDF Set', icon: FaLayerGroup, color: '#8b5cf6', desc: 'Sosyal bilimler branşına özel denemeler' },
      { label: 'Fen Bilimleri PDF Set',   icon: FaLayerGroup, color: '#10b981', desc: 'Fen bilimleri branşına özel denemeler' },
    ]
  },
  mat: {
    title: 'Matematik PDF Set',
    items: [
      { label: 'TYT Çıkmış Karma PDF Set',   icon: FaLayerGroup,    color: '#f97316', desc: 'ÖSYM çıkmış sorularından oluşan 7\'li matematik bölüm denemesi seti', route: '/ogrenci-pdf/tyt/cikmis-karma-pdf-set' },
    ]
  }
};

const AYT_DENEME_FOLDERS = {
  root: {
    title: 'Deneme türü seçin',
    items: [
      { label: 'AYT Genel Denemeler',   icon: FaClipboardList, color: '#f59e0b', desc: 'Tüm alan sorularını kapsayan tam AYT denemesi' },
      { label: 'AYT Bölüm Denemeleri', icon: FaPencilAlt,     color: '#ec4899', desc: 'Alanlara göre ayrılmış bölüm denemeleri', folderId: 'ayt-bolum' },
    ]
  },
  'ayt-bolum': {
    title: 'AYT Bölüm Denemeleri',
    items: [
      { label: 'Matematik PDF Set',     icon: FaLayerGroup, color: '#3b82f6', desc: 'AYT Matematik branşına özel denemeler', folderId: 'ayt-mat' },
      { label: 'Fizik PDF Set',         icon: FaLayerGroup, color: '#f97316', desc: 'AYT Fizik branşına özel denemeler' },
      { label: 'Kimya PDF Set',         icon: FaLayerGroup, color: '#10b981', desc: 'AYT Kimya branşına özel denemeler' },
      { label: 'Biyoloji PDF Set',      icon: FaLayerGroup, color: '#22d3ee', desc: 'AYT Biyoloji branşına özel denemeler' },
      { label: 'Edebiyat PDF Set',      icon: FaLayerGroup, color: '#ef4444', desc: 'AYT Türk Dili ve Edebiyatı branşına özel denemeler' },
      { label: 'Tarih PDF Set',         icon: FaLayerGroup, color: '#8b5cf6', desc: 'AYT Tarih branşına özel denemeler' },
      { label: 'Coğrafya PDF Set',      icon: FaLayerGroup, color: '#ec4899', desc: 'AYT Coğrafya branşına özel denemeler' },
    ]
  },
  'ayt-mat': {
    title: 'Matematik PDF Set',
    items: [
      { label: 'AYT Çıkmış Karma PDF Set', icon: FaLayerGroup, color: '#f97316', desc: 'ÖSYM çıkmış sorularından oluşan AYT matematik bölüm denemesi seti', route: '/ogrenci-pdf/ayt/cikmis-karma-pdf-set' },
    ]
  },
};

// ─── Styles ───
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  .kp-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: calc(100vh - 80px);
    background: #06080f;
    position: relative;
    overflow: hidden;
    padding: 2.5rem 1.5rem 5rem;
  }

  .kp-bg-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 75% 75% at 50% 30%, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 75% 75% at 50% 30%, black 20%, transparent 80%);
  }

  .kp-orb {
    position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
    animation: kp-drift 14s ease-in-out infinite;
  }
  @keyframes kp-drift {
    0%,100% { transform: translate(0,0); }
    50%      { transform: translate(25px,-20px); }
  }

  .kp-inner {
    position: relative; z-index: 1;
    max-width: 900px; margin: 0 auto;
  }

  /* Back link */
  .kp-back {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.8rem; font-weight: 500; color: rgba(148,163,184,0.7);
    text-decoration: none; margin-bottom: 2rem;
    transition: color 0.2s;
  }
  .kp-back:hover { color: #f59e0b; }

  /* Hero */
  .kp-hero {
    display: flex; align-items: center; gap: 1.25rem;
    margin-bottom: 2.5rem;
    animation: kp-in 0.7s ease both;
  }
  @keyframes kp-in {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .kp-hero-icon {
    width: 64px; height: 64px; border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .kp-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700; letter-spacing: -0.02em; color: #eef2ff; line-height: 1;
  }
  .kp-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 100px; margin-top: 0.5rem;
  }

  /* Subject selector (ara sınıf) */
  .kp-section-label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: rgba(100,116,139,0.8);
    margin-bottom: 0.75rem;
  }

  .kp-subjects {
    display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.5rem;
    animation: kp-in 0.7s ease 0.1s both;
  }
  .kp-subj-btn {
    padding: 0.5rem 1.1rem; border-radius: 100px;
    font-size: 0.82rem; font-weight: 500;
    border: 1px solid rgba(42,51,80,0.9);
    color: rgba(148,163,184,0.8); background: transparent;
    cursor: pointer; transition: all 0.18s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .kp-subj-btn:hover { border-color: var(--cat-border); color: #eef2ff; }
  .kp-subj-btn.active {
    border-color: var(--cat-color); background: var(--cat-bg); color: #eef2ff;
    box-shadow: 0 0 14px var(--cat-bg);
  }

  /* Items grid */
  .kp-items {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    animation: kp-in 0.7s ease 0.15s both;
  }
  @media (min-width: 560px) { .kp-items { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 800px) { .kp-items { grid-template-columns: 1fr 1fr 1fr 1fr; } }

  .kp-item {
    position: relative;
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 0.85rem;
    padding: 1.5rem 1rem 1.25rem;
    border-radius: 18px;
    background: rgba(12,16,30,0.7);
    border: 1px solid rgba(255,255,255,0.06);
    cursor: pointer; text-decoration: none;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, box-shadow 0.25s, background 0.25s;
    overflow: hidden;
  }
  .kp-item::before {
    content: ''; position: absolute; inset: 0; border-radius: 18px;
    background: var(--item-shine); opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
  }
  .kp-item:hover::before { opacity: 1; }
  .kp-item:hover {
    transform: translateY(-6px) scale(1.03);
    border-color: var(--item-border);
    box-shadow: 0 16px 40px var(--item-glow);
  }
  .kp-item.expanded {
    border-color: var(--item-border);
    background: var(--item-bg-active);
  }

  .kp-item-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    position: relative; z-index: 1;
  }
  .kp-item:hover .kp-item-icon { transform: scale(1.12) rotate(-5deg); }

  .kp-item-label {
    font-size: 0.85rem; font-weight: 600; color: #d1d5db;
    position: relative; z-index: 1; line-height: 1.3;
  }
  .kp-item-desc {
    font-size: 0.72rem; color: rgba(100,116,139,0.8);
    line-height: 1.5; position: relative; z-index: 1;
  }
  .kp-item-arrow {
    font-size: 0.65rem; color: var(--item-color);
    opacity: 0; transform: translateY(4px);
    transition: opacity 0.2s, transform 0.2s;
    position: relative; z-index: 1;
  }
  .kp-item:hover .kp-item-arrow { opacity: 1; transform: translateY(0); }

  /* Expandable chevron */
  .kp-item-chevron {
    font-size: 0.65rem; color: var(--item-color);
    position: relative; z-index: 1;
    transition: transform 0.25s ease;
  }
  .kp-item.expanded .kp-item-chevron { transform: rotate(180deg); }

  /* Sub panel (TYT Deneme) */
  .kp-sub-panel {
    margin-top: 1rem;
    background: rgba(8,10,22,0.85);
    border: 1px solid rgba(245,158,11,0.15);
    border-radius: 16px;
    padding: 1.25rem;
    animation: kp-in 0.35s ease both;
  }
  .kp-sub-title {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: rgba(100,116,139,0.7);
    margin-bottom: 0.9rem;
  }
  .kp-sub-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  @media (min-width: 560px) { .kp-sub-grid { grid-template-columns: 1fr 1fr; } }

  .kp-sub-card {
    display: flex; align-items: flex-start; gap: 0.9rem;
    padding: 1rem 1.1rem;
    background: rgba(12,16,30,0.8);
    border: 1px solid rgba(42,51,80,0.8);
    border-radius: 12px; cursor: pointer; text-align: left;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .kp-sub-card:hover {
    border-color: var(--sub-border);
    background: var(--sub-bg);
    transform: translateY(-2px);
  }
  .kp-sub-icon {
    flex-shrink: 0; width: 38px; height: 38px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-top: 1px;
  }
  .kp-sub-name { font-size: 0.86rem; font-weight: 600; color: #e2e8f0; }
  .kp-sub-desc { font-size: 0.73rem; color: rgba(100,116,139,0.8); margin-top: 0.2rem; line-height: 1.45; }

  .kp-sub-header {
    display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.9rem;
  }
  .kp-sub-back {
    display: flex; align-items: center; justify-content: center;
    width: 24px; height: 24px; border-radius: 6px;
    background: rgba(255,255,255,0.05); color: #94a3b8;
    border: 1px solid rgba(255,255,255,0.1);
    cursor: pointer; transition: all 0.2s;
  }
  .kp-sub-back:hover { background: rgba(255,255,255,0.1); color: #f59e0b; }
  .kp-sub-title-flex { margin-bottom: 0; }

  /* Toast */
  .kp-toast {
    position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
    z-index: 9999; background: #1a2035; border: 1px solid rgba(245,158,11,0.3);
    color: #fde68a; font-size: 0.82rem; padding: 0.7rem 1.4rem;
    border-radius: 12px; white-space: nowrap;
    animation: kp-in 0.25s ease both;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`;

export default function OgrenciPDFKategori() {
  const { kategori } = useParams();
  const cat = CATEGORY_MAP[kategori];

  const navigate = useNavigate();
  const [activeSubject, setActiveSubject]   = useState(null);
  const [expandedDeneme, setExpandedDeneme] = useState(false);
  const [denemePath, setDenemePath]         = useState(['root']);
  const [toast, setToast]                   = useState(null);

  if (!cat) {
    return (
      <div style={{ minHeight: 'calc(100vh - 80px)', background: '#06080f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Kategori bulunamadı.</p>
          <Link to="/ogrenci-pdf" style={{ color: '#f59e0b', textDecoration: 'underline' }}>Geri dön</Link>
        </div>
      </div>
    );
  }

  const isAra   = cat.group === 'ara';
  const isTYT   = kategori === 'tyt';
  const isAYT   = kategori === 'ayt';
  const items   = isAra ? ARA_ITEMS : SINAV_ITEMS;
  const DENEME_FOLDERS = isAYT ? AYT_DENEME_FOLDERS : TYT_DENEME_FOLDERS;
  const showItems = !isAra || activeSubject;

  const cssVars = {
    '--cat-color':  cat.color,
    '--cat-bg':     cat.bg,
    '--cat-border': cat.border,
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleItemClick = (item) => {
    if (item.expandable && (isTYT || isAYT)) {
      setExpandedDeneme((v) => !v);
      setDenemePath(['root']); // Reset path on toggle
      return;
    }
    showToast(`"${item.label}" içeriği yakında eklenecek!`);
  };

  const handleSubItemClick = (d) => {
    if (d.route) {
      navigate(d.route);
    } else if (d.folderId) {
      setDenemePath((prev) => [...prev, d.folderId]);
    } else {
      showToast(`"${d.label}" içeriği yakında eklenecek!`);
    }
  };

  const CatIcon = cat.icon;
  const currentFolderKey = denemePath[denemePath.length - 1];
  const currentFolder = DENEME_FOLDERS[currentFolderKey];

  return (
    <>
      <style>{STYLES}</style>
      <Helmet>
        <title>{cat.label} PDF Kaynakları — Metamorfoz Akademisi</title>
        <meta name="description" content={`${cat.label} sınavına hazırlık için PDF kaynakları, deneme sınavları ve konu anlatımları. Metamorfoz Akademisi ile ${cat.label} hazırlığında bir adım öne geç.`} />
      </Helmet>

      {toast && <div className="kp-toast">{toast}</div>}

      <div className="kp-page" style={cssVars}>
        <div className="kp-bg-grid" />
        <div className="kp-orb" style={{
          width: 500, height: 500,
          background: `radial-gradient(circle, ${cat.bg} 0%, transparent 65%)`,
          top: -180, right: -120,
        }} />

        <div className="kp-inner">
          {/* ── Geri butonu ── */}
          <Link to="/ogrenci-pdf" className="kp-back">
            <FaChevronLeft style={{ fontSize: 10 }} />
            Tüm kategoriler
          </Link>

          {/* ── Hero ── */}
          <div className="kp-hero">
            <div className="kp-hero-icon" style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
              <CatIcon style={{ color: cat.color, fontSize: '1.75rem' }} />
            </div>
            <div>
              <div className="kp-hero-title">{cat.label}</div>
              <div
                className="kp-hero-badge"
                style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}
              >
                {isAra ? 'Ara Sınıf' : 'Sınav Grubu'} · PDF Kaynakları
              </div>
            </div>
          </div>

          {/* ── Ara sınıf: ders seçimi ── */}
          {isAra && (
            <div style={{ marginBottom: '2rem' }}>
              <p className="kp-section-label">Ders seçin</p>
              <div className="kp-subjects">
                {ARA_SUBJECTS.map((s) => (
                  <button
                    key={s}
                    className={`kp-subj-btn${activeSubject === s ? ' active' : ''}`}
                    onClick={() => setActiveSubject(activeSubject === s ? null : s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── İçerik kartları ── */}
          {showItems && (
            <>
              {isAra && activeSubject && (
                <p className="kp-section-label" style={{ marginBottom: '0.75rem' }}>{activeSubject} kaynakları</p>
              )}
              {!isAra && (
                <p className="kp-section-label" style={{ marginBottom: '0.75rem' }}>{cat.label} kaynakları</p>
              )}

              <div className="kp-items">
                {items.map((item) => {
                  const isExp = item.expandable && (isTYT || isAYT) && expandedDeneme;
                  return (
                    <button
                      key={item.label}
                      className={`kp-item${isExp ? ' expanded' : ''}`}
                      onClick={() => handleItemClick(item)}
                      style={{
                        '--item-color':     item.color,
                        '--item-shine':     `radial-gradient(ellipse at 50% 0%, ${item.color}18 0%, transparent 65%)`,
                        '--item-border':    item.color + '55',
                        '--item-glow':      item.color + '22',
                        '--item-bg-active': item.color + '10',
                      }}
                    >
                      <div className="kp-item-icon" style={{ background: item.color + '18', border: `1px solid ${item.color}30` }}>
                        <item.icon style={{ color: item.color, fontSize: '1.25rem' }} />
                      </div>
                      <div className="kp-item-label">{item.label}</div>
                      <div className="kp-item-desc">{item.desc}</div>
                      {item.expandable && (isTYT || isAYT)
                        ? <FaChevronDown className="kp-item-chevron" />
                        : <FaArrowRight className="kp-item-arrow" />
                      }
                    </button>
                  );
                })}
              </div>

              {/* ── TYT / AYT Deneme alt panel ── */}
              {(isTYT || isAYT) && expandedDeneme && (
                <div className="kp-sub-panel">
                  <div className="kp-sub-header">
                    {denemePath.length > 1 && (
                      <button className="kp-sub-back" onClick={() => setDenemePath(prev => prev.slice(0, -1))}>
                        <FaChevronLeft style={{ fontSize: '0.65rem' }} />
                      </button>
                    )}
                    <p className="kp-sub-title kp-sub-title-flex">{currentFolder?.title || 'Seçim Yapın'}</p>
                  </div>
                  <div className="kp-sub-grid">
                    {currentFolder?.items?.map((d) => (
                      <button
                        key={d.label}
                        className="kp-sub-card"
                        onClick={() => handleSubItemClick(d)}
                        style={{
                          '--sub-border': d.color + '60',
                          '--sub-bg':     d.color + '10',
                        }}
                      >
                        <div className="kp-sub-icon" style={{ background: d.color + '18' }}>
                          {d.folderId ? <FaLayerGroup style={{ color: d.color, fontSize: '1rem' }} /> : <d.icon style={{ color: d.color, fontSize: '1rem' }} />}
                        </div>
                        <div>
                          <div className="kp-sub-name">{d.label}</div>
                          <div className="kp-sub-desc">{d.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Ders seçilmedi uyarısı */}
          {isAra && !activeSubject && (
            <p style={{ textAlign: 'center', color: 'rgba(100,116,139,0.6)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Kaynakları görmek için yukarıdan bir ders seçin.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
