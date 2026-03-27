import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaChevronLeft, FaDownload, FaShoppingCart,
  FaCheck, FaWhatsapp,
  FaCreditCard, FaUniversity, FaTimes,
} from 'react-icons/fa';

// Gumroad ürün linkinizi buraya yapıştırın:
const GUMROAD_URL = 'https://gumroad.com/l/LINKINIZI_BURAYA_YAZIN';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  .cpdf-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: calc(100vh - 80px);
    background: #06080f;
    position: relative; overflow: hidden;
    padding: 2.5rem 1.5rem 5rem;
  }
  .cpdf-bg-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 80%);
  }
  .cpdf-orb-1 {
    position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 65%);
    top: -150px; right: -100px;
    animation: cpdf-drift 16s ease-in-out infinite;
  }
  .cpdf-orb-2 {
    position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 65%);
    bottom: -100px; left: -80px;
    animation: cpdf-drift 12s ease-in-out infinite reverse;
    animation-delay: -5s;
  }
  @keyframes cpdf-drift {
    0%,100% { transform: translate(0,0); }
    50%      { transform: translate(25px,-20px); }
  }
  @keyframes cpdf-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cpdf-inner {
    position: relative; z-index: 1;
    max-width: 1060px; margin: 0 auto;
  }

  /* ─── Back ─── */
  .cpdf-back {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.8rem; font-weight: 500; color: rgba(148,163,184,0.7);
    text-decoration: none; margin-bottom: 2rem;
    transition: color 0.2s;
  }
  .cpdf-back:hover { color: #f59e0b; }

  /* ─── Banner ─── */
  .cpdf-banner {
    background: linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(217,119,6,0.1) 50%, rgba(180,83,9,0.06) 100%);
    border: 1px solid rgba(245,158,11,0.3);
    border-radius: 20px;
    padding: 1.5rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    gap: 1.5rem; flex-wrap: wrap;
    margin-bottom: 2.5rem;
    animation: cpdf-in 0.6s ease both;
    position: relative; overflow: hidden;
  }
  .cpdf-banner::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 0% 50%, rgba(245,158,11,0.12) 0%, transparent 55%);
    pointer-events: none;
  }
  .cpdf-banner-text {
    position: relative; z-index: 1;
  }
  .cpdf-banner-eyebrow {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: #f59e0b; margin-bottom: 0.35rem;
  }
  .cpdf-banner-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.3rem, 3vw, 1.75rem);
    font-weight: 700; color: #eef2ff; line-height: 1.2;
  }
  .cpdf-banner-sub {
    font-size: 0.82rem; color: rgba(203,213,225,0.75);
    margin-top: 0.3rem; line-height: 1.5;
  }
  .cpdf-banner-actions {
    display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;
    position: relative; z-index: 1; flex-shrink: 0;
  }
  .cpdf-btn-free {
    display: flex; align-items: center; gap: 8px;
    padding: 0.8rem 1.5rem;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: #06080f; font-weight: 700; font-size: 0.88rem;
    border: none; border-radius: 12px; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(245,158,11,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .cpdf-btn-free:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(245,158,11,0.5);
  }
  .cpdf-btn-buy {
    display: flex; align-items: center; gap: 8px;
    padding: 0.8rem 1.5rem;
    background: rgba(245,158,11,0.1);
    color: #fde68a; font-weight: 600; font-size: 0.88rem;
    border: 1px solid rgba(245,158,11,0.35); border-radius: 12px; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .cpdf-btn-buy:hover {
    background: rgba(245,158,11,0.17);
    border-color: rgba(245,158,11,0.55);
    transform: translateY(-2px);
  }

  /* ─── Body grid ─── */
  .cpdf-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
    animation: cpdf-in 0.7s ease 0.1s both;
  }
  @media (min-width: 740px) {
    .cpdf-body { grid-template-columns: 320px 1fr; gap: 2.5rem; }
  }

  /* ─── Cover card ─── */
  .cpdf-cover {
    border-radius: 20px; overflow: hidden;
    border: 1px solid rgba(245,158,11,0.2);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.08);
  }
  .cpdf-cover img {
    width: 100%; height: auto; display: block;
  }

  /* ─── Info panel ─── */
  .cpdf-info {
    display: flex; flex-direction: column; gap: 1.5rem;
  }

  .cpdf-info-card {
    background: rgba(10,14,26,0.75);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 1.75rem;
    backdrop-filter: blur(10px);
  }

  .cpdf-info-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 700; color: #eef2ff;
    margin-bottom: 0.3rem;
  }
  .cpdf-info-sub {
    font-size: 0.82rem; color: rgba(148,163,184,0.75);
    margin-bottom: 1.5rem; line-height: 1.5;
  }

  .cpdf-feature-list {
    display: flex; flex-direction: column; gap: 0.7rem;
    margin-bottom: 1.5rem;
  }
  .cpdf-feature {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 0.85rem; color: rgba(203,213,225,0.9);
    line-height: 1.45;
  }
  .cpdf-feature-icon {
    flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
    background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3);
    display: flex; align-items: center; justify-content: center;
    margin-top: 1px;
  }
  .cpdf-feature-icon svg { color: #f59e0b; font-size: 9px; }

  .cpdf-divider {
    height: 1px; margin: 0 0 1.5rem;
    background: linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent);
    border: none;
  }

  .cpdf-contents-title {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(100,116,139,0.8);
    margin-bottom: 0.85rem;
  }
  .cpdf-contents-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }
  @media (min-width: 560px) {
    .cpdf-contents-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .cpdf-content-item {
    display: flex; flex-direction: column; align-items: stretch;
    background: rgba(6,8,15,0.6);
    border: 1px solid rgba(42,51,80,0.8);
    border-radius: 10px;
    overflow: hidden;
    font-size: 0.78rem; font-weight: 500; color: rgba(148,163,184,0.85);
    transition: border-color 0.2s, transform 0.2s;
  }
  .cpdf-content-item:hover {
    border-color: rgba(245,158,11,0.35);
    transform: translateY(-2px);
  }
  .cpdf-content-thumb {
    width: 100%; aspect-ratio: 17/24;
    object-fit: cover; object-position: top;
    display: block;
  }
  .cpdf-content-footer {
    display: flex; align-items: center; gap: 7px;
    padding: 0.5rem 0.65rem;
  }
  .cpdf-content-num {
    font-size: 0.68rem; font-weight: 700;
    color: #f59e0b;
    background: rgba(245,158,11,0.12);
    border-radius: 5px;
    padding: 1px 6px;
    flex-shrink: 0;
  }

  /* Stats row */
  .cpdf-stats {
    display: flex; gap: 1rem; flex-wrap: wrap;
    margin-top: 1.25rem; padding-top: 1.25rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .cpdf-stat {
    display: flex; flex-direction: column; gap: 2px;
  }
  .cpdf-stat-val {
    font-size: 1.35rem; font-weight: 700; color: #fde68a;
    line-height: 1;
  }
  .cpdf-stat-label {
    font-size: 0.72rem; color: rgba(100,116,139,0.8);
  }
  .cpdf-stat-sep {
    width: 1px; background: rgba(255,255,255,0.07);
    align-self: stretch; margin: 0 0.25rem;
  }

  /* CTA card */
  .cpdf-cta-card {
    background: rgba(10,14,26,0.75);
    border: 1px solid rgba(245,158,11,0.18);
    border-radius: 18px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
  }
  .cpdf-cta-title {
    font-size: 0.9rem; font-weight: 600; color: #eef2ff;
    margin-bottom: 0.3rem;
  }
  .cpdf-cta-sub {
    font-size: 0.78rem; color: rgba(100,116,139,0.8);
    margin-bottom: 1.1rem; line-height: 1.5;
  }
  .cpdf-cta-btn-full {
    width: 100%; padding: 0.9rem;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: #06080f; font-weight: 700; font-size: 0.9rem;
    border: none; border-radius: 12px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(245,158,11,0.3);
    transition: transform 0.2s, box-shadow 0.2s;
    margin-bottom: 0.75rem;
  }
  .cpdf-cta-btn-full:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.45); }
  .cpdf-cta-wa {
    width: 100%; padding: 0.75rem;
    background: rgba(37,211,102,0.1);
    color: #4ade80; font-weight: 600; font-size: 0.85rem;
    border: 1px solid rgba(37,211,102,0.25); border-radius: 12px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.2s;
  }
  .cpdf-cta-wa:hover { background: rgba(37,211,102,0.18); border-color: rgba(37,211,102,0.45); }
  .cpdf-fine {
    font-size: 0.68rem; color: rgba(100,116,139,0.55);
    text-align: center; margin-top: 0.6rem; line-height: 1.5;
  }

  /* ─── Price ─── */
  .cpdf-price-badge {
    display: inline-flex; flex-direction: column; align-items: center; justify-content: center;
    background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.35);
    border-radius: 14px; padding: 0.45rem 1rem;
    position: relative; z-index: 1; flex-shrink: 0;
    box-shadow: 0 0 18px rgba(59,130,246,0.18);
  }
  .cpdf-price-badge-label {
    font-size: 0.58rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(96,165,250,0.7); line-height: 1; margin-bottom: 2px;
  }
  .cpdf-price-badge-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem; font-weight: 700; line-height: 1;
    background: linear-gradient(135deg, #bfdbfe 0%, #60a5fa 55%, #2563eb 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    filter: drop-shadow(0 0 10px rgba(59,130,246,0.5));
  }
  .cpdf-cta-price-row {
    display: flex; align-items: baseline; gap: 0.4rem;
    margin-bottom: 1rem; padding-bottom: 1rem;
    border-bottom: 1px solid rgba(59,130,246,0.15);
  }
  .cpdf-cta-price-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-weight: 700; line-height: 1;
    background: linear-gradient(135deg, #bfdbfe 0%, #60a5fa 55%, #2563eb 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    filter: drop-shadow(0 0 12px rgba(59,130,246,0.45));
  }
  .cpdf-cta-price-currency {
    font-size: 1rem; font-weight: 700; color: #60a5fa; line-height: 1;
  }
  .cpdf-cta-price-note {
    font-size: 0.72rem; color: rgba(100,116,139,0.7); margin-left: auto;
    line-height: 1.4; text-align: right;
  }
  .cpdf-price-old {
    font-size: 0.72rem; font-weight: 600; color: rgba(148,163,184,0.4);
    text-decoration: line-through; line-height: 1; margin-bottom: 1px;
  }
  .cpdf-price-discount {
    display: inline-flex; align-items: center; gap: 3px;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.06em;
    color: #f87171; background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 6px; padding: 2px 6px; margin-bottom: 3px;
  }
  .cpdf-cta-price-old {
    font-size: 0.88rem; font-weight: 600; color: rgba(148,163,184,0.4);
    text-decoration: line-through; line-height: 1;
  }
  .cpdf-cta-price-discount {
    display: inline-flex; align-items: center; gap: 3px;
    font-size: 0.68rem; font-weight: 700;
    color: #f87171; background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 6px; padding: 2px 8px;
  }

  /* ─── Payment Modal ─── */
  .pay-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: cpdf-in 0.2s ease both;
  }
  .pay-modal {
    background: #0d1020;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 2rem;
    width: 100%; max-width: 420px;
    position: relative;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
    animation: pay-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes pay-pop {
    from { opacity: 0; transform: scale(0.9) translateY(16px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .pay-close {
    position: absolute; top: 1rem; right: 1rem;
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    color: rgba(148,163,184,0.7); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; transition: all 0.2s;
  }
  .pay-close:hover { background: rgba(255,255,255,0.12); color: #fff; }
  .pay-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 700; color: #eef2ff;
    margin-bottom: 0.3rem;
  }
  .pay-sub {
    font-size: 0.78rem; color: rgba(148,163,184,0.65);
    margin-bottom: 1.5rem; line-height: 1.5;
  }
  .pay-options {
    display: flex; flex-direction: column; gap: 0.85rem;
  }
  .pay-option {
    display: flex; align-items: center; gap: 1rem;
    padding: 1.1rem 1.25rem;
    border-radius: 16px; cursor: pointer;
    border: 1px solid; text-align: left;
    background: transparent; width: 100%;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .pay-option:hover { transform: translateY(-2px); }
  .pay-option.card {
    border-color: rgba(245,158,11,0.35);
    background: rgba(245,158,11,0.06);
  }
  .pay-option.card:hover {
    background: rgba(245,158,11,0.12);
    box-shadow: 0 8px 24px rgba(245,158,11,0.2);
    border-color: rgba(245,158,11,0.6);
  }
  .pay-option.havale {
    border-color: rgba(37,211,102,0.3);
    background: rgba(37,211,102,0.05);
  }
  .pay-option.havale:hover {
    background: rgba(37,211,102,0.12);
    box-shadow: 0 8px 24px rgba(37,211,102,0.15);
    border-color: rgba(37,211,102,0.55);
  }
  .pay-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 1.1rem;
  }
  .pay-icon.card { background: rgba(245,158,11,0.15); color: #f59e0b; }
  .pay-icon.havale { background: rgba(37,211,102,0.15); color: #4ade80; }
  .pay-option-body { flex: 1; }
  .pay-option-title {
    font-weight: 700; font-size: 0.92rem; color: #eef2ff; margin-bottom: 0.2rem;
  }
  .pay-option-desc {
    font-size: 0.72rem; color: rgba(148,163,184,0.65); line-height: 1.4;
  }
  .pay-option-arrow {
    font-size: 1rem; color: rgba(100,116,139,0.5);
    transition: transform 0.2s, color 0.2s;
  }
  .pay-option:hover .pay-option-arrow { transform: translateX(4px); color: rgba(148,163,184,0.9); }
`;

const FEATURES = [
  '7 adet TYT matematik bölüm denemesi (her biri 40 soru)',
  'ÖSYM çıkmış sorulardan oluşan karma format',
  'Konu dağılımı ve cevap anahtarı dahil',
  'Gerçek sınav standardında hazırlanmış PDF',
  'Metamorfoz Akademisi kalitesi ile hazırlanmıştır',
];

const DENEME_CONTENTS = [
  { num: '01', label: 'Deneme 1', img: '/deneme-01-cover.jpg' },
  { num: '02', label: 'Deneme 2', img: '/deneme-02-cover.jpg' },
  { num: '03', label: 'Deneme 3', img: '/deneme-03-cover.jpg' },
  { num: '04', label: 'Deneme 4', img: '/deneme-04-cover.jpg' },
  { num: '05', label: 'Deneme 5', img: '/deneme-05-cover.jpg' },
  { num: '06', label: 'Deneme 6', img: '/deneme-06-cover.jpg' },
  { num: '07', label: 'Deneme 7', img: '/deneme-07-cover.jpg' },
];

export default function TYTCikmisKarmaPDFSet() {
  const [showPayModal, setShowPayModal] = useState(false);

  const handleHavale = () => {
    setShowPayModal(false);
    const msg = encodeURIComponent('Merhaba! TYT Matematik Çıkmış Karma 7\'li Bölüm Denemesi PDF Seti için havale/EFT ile ödeme yapmak istiyorum. Hesap bilgilerini paylaşabilir misiniz?');
    window.open(`https://wa.me/905333785730?text=${msg}`, '_blank');
  };

  const handleKartOdeme = () => {
    setShowPayModal(false);
    window.open(GUMROAD_URL, '_blank');
  };

  return (
    <>
      <style>{STYLES}</style>
      <Helmet><title>TYT Matematik Çıkmış Karma PDF Set — Metamorfoz Akademisi</title></Helmet>

      {/* ── Ödeme Yöntemi Modalı ── */}
      {showPayModal && (
        <div className="pay-overlay" onClick={() => setShowPayModal(false)}>
          <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pay-close" onClick={() => setShowPayModal(false)}>
              <FaTimes />
            </button>
            <div className="pay-title">Ödeme Yöntemi Seç</div>
            <div className="pay-sub">
              TYT Matematik Çıkmış Karma 7'li Set için nasıl ödeme yapmak istersiniz?
            </div>
            <div className="pay-options">
              <button className="pay-option card" onClick={handleKartOdeme}>
                <div className="pay-icon card"><FaCreditCard /></div>
                <div className="pay-option-body">
                  <div className="pay-option-title">Kredi / Banka Kartı</div>
                  <div className="pay-option-desc">Gumroad güvencesiyle anlık ödeme — PDF otomatik teslim edilir</div>
                </div>
                <span className="pay-option-arrow">›</span>
              </button>
              <button className="pay-option havale" onClick={handleHavale}>
                <div className="pay-icon havale"><FaUniversity /></div>
                <div className="pay-option-body">
                  <div className="pay-option-title">Havale / EFT</div>
                  <div className="pay-option-desc">WhatsApp üzerinden IBAN bilgisini alarak havale ile öde</div>
                </div>
                <span className="pay-option-arrow">›</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cpdf-page">
        <div className="cpdf-bg-grid" />
        <div className="cpdf-orb-1" />
        <div className="cpdf-orb-2" />

        <div className="cpdf-inner">
          {/* ── Back ── */}
          <Link to="/ogrenci-pdf/tyt" className="cpdf-back">
            <FaChevronLeft style={{ fontSize: 10 }} />
            TYT Kaynakları
          </Link>

          {/* ── Banner ── */}
          <div className="cpdf-banner">
            <div className="cpdf-banner-text">
              <div className="cpdf-banner-eyebrow">Ücretsiz Deneme</div>
              <div className="cpdf-banner-title">
                Deneme 1'i ücretsiz indir, beğenirsen seti satın al!
              </div>
              <div className="cpdf-banner-sub">
                7'li TYT Matematik Çıkmış Karma Bölüm Denemesi — gerçek ÖSYM formatı
              </div>
            </div>
            <div className="cpdf-banner-actions">
              <div className="cpdf-price-badge">
                <span className="cpdf-price-discount">🔥 -%25</span>
                <span className="cpdf-price-old">₺199,9</span>
                <span className="cpdf-price-badge-label">Set Fiyatı</span>
                <span className="cpdf-price-badge-val">₺149,99</span>
              </div>
              <a
                href="/2026-TYT-Mat-Deneme-1.pdf"
                download="TYT-Matematik-Deneme-1.pdf"
                className="cpdf-btn-free"
              >
                <FaDownload />
                ÜCRETSİZ İNDİR (1. Deneme)
              </a>
              <button className="cpdf-btn-buy" onClick={() => setShowPayModal(true)}>
                <FaShoppingCart />
                Seti Satın Al
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="cpdf-body">
            {/* Cover */}
            <div
              className="cpdf-cover"
              onClick={() => document.getElementById('set-icerigi')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              style={{ cursor: 'pointer' }}
            >
              <img src="/deneme-01-cover.jpg" alt="TYT Matematik Çıkmış Karma 7'li Bölüm Denemesi PDF Seti" />
            </div>

            {/* Info */}
            <div className="cpdf-info">
              <div className="cpdf-info-card">
                <div className="cpdf-info-title">TYT Matematik Çıkmış Karma 7'li Set</div>
                <div className="cpdf-info-sub">
                  ÖSYM'nin çıkmış sorularından derlenen, gerçek sınav formatındaki 7 adet bölüm denemesini içeren kapsamlı PDF seti.
                </div>

                <div className="cpdf-feature-list">
                  {FEATURES.map((f, i) => (
                    <div className="cpdf-feature" key={i}>
                      <div className="cpdf-feature-icon"><FaCheck /></div>
                      {f}
                    </div>
                  ))}
                </div>

                <hr className="cpdf-divider" />

                <div id="set-icerigi" className="cpdf-contents-title">Set İçeriği — 7 Deneme</div>
                <div className="cpdf-contents-grid">
                  {DENEME_CONTENTS.map((d) => (
                    <div className="cpdf-content-item" key={d.num}>
                      <img src={d.img} alt={d.label} className="cpdf-content-thumb" />
                      <div className="cpdf-content-footer">
                        <span className="cpdf-content-num">{d.num}</span>
                        {d.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cpdf-stats">
                  <div className="cpdf-stat">
                    <div className="cpdf-stat-val">7</div>
                    <div className="cpdf-stat-label">Deneme</div>
                  </div>
                  <div className="cpdf-stat-sep" />
                  <div className="cpdf-stat">
                    <div className="cpdf-stat-val">280</div>
                    <div className="cpdf-stat-label">Soru</div>
                  </div>
                  <div className="cpdf-stat-sep" />
                  <div className="cpdf-stat">
                    <div className="cpdf-stat-val">PDF</div>
                    <div className="cpdf-stat-label">Format</div>
                  </div>
                  <div className="cpdf-stat-sep" />
                  <div className="cpdf-stat">
                    <div className="cpdf-stat-val">ÖSYM</div>
                    <div className="cpdf-stat-label">Kaynaklı</div>
                  </div>
                </div>
              </div>

              <div className="cpdf-cta-card">
                <div className="cpdf-cta-title">Tüm Seti Satın Al</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span className="cpdf-cta-price-discount">🔥 -%25 İndirim</span>
                  <span className="cpdf-cta-price-old">₺199,9</span>
                </div>
                <div className="cpdf-cta-price-row">
                  <span className="cpdf-cta-price-currency">₺</span>
                  <span className="cpdf-cta-price-amount">149,99</span>
                  <span className="cpdf-cta-price-note">7 deneme<br />280 soru</span>
                </div>
                <div className="cpdf-cta-sub">
                  Kredi kartı (Gumroad) veya havale/EFT ile güvenle satın alabilirsin.
                </div>
                <button className="cpdf-cta-btn-full" onClick={() => setShowPayModal(true)}>
                  <FaShoppingCart />
                  Ödeme Yöntemi Seç
                </button>
                <button className="cpdf-cta-wa" onClick={handleHavale}>
                  <FaWhatsapp />
                  WhatsApp ile Bilgi Al
                </button>
                <div className="cpdf-fine">
                  Kredi kartı (Gumroad) veya havale/EFT seçenekleri mevcuttur.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
