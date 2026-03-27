import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaChalkboardTeacher, FaWhatsapp, FaCheck,
  FaClock, FaUserGraduate, FaCampground,
} from 'react-icons/fa';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  /* ─── Hero section (açık) ─── */
  .oz-hero-section {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    padding: 3rem 1.5rem 2.5rem;
  }

  /* ─── Content section (açık) ─── */
  .oz-content-section {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f1f5f9;
    padding: 3rem 1.5rem 5rem;
  }

  /* ─── Wave divider ─── */
  .oz-wave {
    display: block; width: 100%; overflow: hidden; line-height: 0; margin-top: -2px;
  }
  .oz-wave svg { display: block; width: 100%; }

  /* ─── Background ─── */
  .oz-bg-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 80%);
  }
  .oz-orb-1 {
    position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(245,158,11,0.09) 0%, transparent 65%);
    top: -200px; left: -150px;
    animation: oz-drift 16s ease-in-out infinite;
  }
  .oz-orb-2 {
    position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;
    width: 450px; height: 450px;
    background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%);
    bottom: -100px; right: -100px;
    animation: oz-drift 12s ease-in-out infinite reverse;
    animation-delay: -4s;
  }
  @keyframes oz-drift {
    0%, 100% { transform: translate(0,0); }
    50%       { transform: translate(30px, -25px); }
  }

  /* ─── Inner wrapper ─── */
  .oz-inner {
    position: relative; z-index: 1;
    max-width: 900px; margin: 0 auto;
  }

  /* ─── Header ─── */
  .oz-header { text-align: center; margin-bottom: 2.5rem; animation: oz-in 0.7s ease both; }
  .oz-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(245,158,11,0.09);
    border: 1px solid rgba(245,158,11,0.22);
    border-radius: 100px;
    padding: 5px 14px 5px 10px;
    font-size: 11px; font-weight: 600;
    color: #f59e0b; letter-spacing: 0.14em; text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .oz-pill-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #f59e0b;
    box-shadow: 0 0 8px rgba(245,158,11,0.9);
    animation: dot-pulse 2.2s ease-in-out infinite;
  }
  @keyframes dot-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }
  .oz-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    line-height: 1;
    letter-spacing: -0.025em;
    color: #0f172a;
    margin: 0 0 0.75rem;
  }
  .oz-h1-gold {
    background: linear-gradient(135deg, #f59e0b 0%, #fde68a 45%, #f59e0b 75%, #b45309 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .oz-subtitle {
    font-size: 0.92rem; color: #64748b;
    line-height: 1.65; max-width: 520px; margin: 0 auto;
  }

  @keyframes oz-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── Tab switcher ─── */
  .oz-tabs {
    display: flex; justify-content: center;
    gap: 0; margin-bottom: 2.5rem;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 14px; padding: 5px;
    width: fit-content; margin-left: auto; margin-right: auto;
    animation: oz-in 0.7s ease 0.1s both;
  }
  .oz-tab {
    display: flex; align-items: center; gap: 10px;
    padding: 0.9rem 2.2rem;
    border-radius: 10px;
    font-size: 1rem; font-weight: 600;
    border: none; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.22s ease;
    color: #64748b;
    background: transparent;
    white-space: nowrap;
  }
  .oz-tab.active {
    background: linear-gradient(135deg, rgba(6,182,212,0.12), rgba(6,182,212,0.06));
    color: #0891b2;
    border: 1px solid rgba(6,182,212,0.3);
    box-shadow: 0 2px 12px rgba(6,182,212,0.12);
  }
  .oz-tab:not(.active):hover {
    color: #475569;
    background: rgba(0,0,0,0.04);
  }

  /* ─── BIREBIR layout ─── */
  .oz-birebir {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    align-items: start;
    animation: oz-in 0.5s ease both;
  }
  @media (min-width: 820px) {
    .oz-birebir { grid-template-columns: 1fr 1.4fr; gap: 3rem; }
  }

  .oz-left { display: flex; flex-direction: column; gap: 1.5rem; }

  /* Features */
  .oz-features { display: flex; flex-direction: column; gap: 0.9rem; }
  .oz-feat {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 0.85rem 1rem;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .oz-feat:hover { border-color: rgba(6,182,212,0.4); box-shadow: 0 4px 16px rgba(6,182,212,0.1); }
  .oz-feat-icon {
    flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px;
    background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #06b6d4; font-size: 13px;
  }
  .oz-feat-text { font-size: 0.85rem; color: #475569; line-height: 1.5; padding-top: 0.2rem; }

  .oz-info-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #06b6d4;
    border-radius: 16px;
    padding: 1.4rem 1.5rem;
    display: flex; gap: 14px; align-items: flex-start;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .oz-info-icon {
    flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px;
    background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #06b6d4; font-size: 20px;
  }
  .oz-info-title { font-size: 0.9rem; font-weight: 600; color: #0f172a; margin-bottom: 0.25rem; }
  .oz-info-desc  { font-size: 0.8rem; color: #64748b; line-height: 1.55; }

  /* ─── Form ─── */
  .oz-form-wrap {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    padding: 2.25rem 2rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
  .oz-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem; font-weight: 700;
    color: #0f172a; letter-spacing: -0.02em;
    margin-bottom: 0.4rem;
  }
  .oz-form-desc { font-size: 0.83rem; color: #64748b; margin-bottom: 2rem; }
  .oz-divider {
    height: 1px; margin: 0 0 1.8rem;
    background: linear-gradient(90deg, transparent, rgba(245,158,11,0.25), transparent);
    border: none;
  }

  .oz-field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
  .oz-label {
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: #475569;
  }
  .oz-label-count { margin-left: 8px; color: #f59e0b; font-weight: 600; letter-spacing: 0; text-transform: none; }

  .oz-input {
    width: 100%; padding: 0.8rem 1rem;
    background: #f8fafc; color: #0f172a;
    border: 1px solid #cbd5e1;
    border-radius: 12px; outline: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none; -webkit-appearance: none;
    box-sizing: border-box;
  }
  .oz-input::placeholder { color: #94a3b8; }
  .oz-input:focus {
    border-color: rgba(6,182,212,0.6);
    box-shadow: 0 0 0 3px rgba(6,182,212,0.12);
  }
  .oz-input option { background: #ffffff; color: #0f172a; }
  .oz-input optgroup { background: #f1f5f9; color: #64748b; font-size: 0.75rem; }

  .oz-subjects { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .oz-subject {
    padding: 0.45rem 0.95rem;
    border-radius: 100px;
    font-size: 0.8rem; font-weight: 500;
    border: 1px solid #cbd5e1;
    color: #475569;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.18s ease;
    display: flex; align-items: center; gap: 5px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .oz-subject:hover { border-color: rgba(6,182,212,0.5); color: #0f172a; background: rgba(6,182,212,0.05); }
  .oz-subject.active { border-color: rgba(6,182,212,0.7); background: rgba(6,182,212,0.1); color: #0891b2; }

  .oz-toggle {
    display: inline-flex;
    border: 1px solid #cbd5e1;
    border-radius: 10px; overflow: hidden;
  }
  .oz-toggle-btn {
    padding: 0.6rem 1.1rem; font-size: 0.82rem; font-weight: 500;
    background: #ffffff; color: #64748b;
    border: none; cursor: pointer;
    transition: all 0.18s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .oz-toggle-btn.active { background: rgba(6,182,212,0.1); color: #0891b2; }
  .oz-freq-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem; }
  .oz-freq-badge {
    font-size: 0.78rem; color: #64748b;
    padding: 0.4rem 0.9rem;
    background: #ffffff; border: 1px solid #e2e8f0;
    border-radius: 8px;
  }

  .oz-submit {
    width: 100%; padding: 1rem;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: #06080f; font-weight: 700; font-size: 0.95rem;
    border: none; border-radius: 14px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: 0.02em;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 24px rgba(245,158,11,0.3);
    margin-top: 0.5rem;
  }
  .oz-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(245,158,11,0.45); }
  .oz-submit:active { transform: translateY(0); }
  .oz-submit svg { font-size: 1.1rem; }
  .oz-fine-print { font-size: 0.72rem; color: #94a3b8; text-align: center; margin-top: 0.75rem; }

  /* Success */
  .oz-success {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 1.5rem; padding: 3rem 1.5rem;
    animation: oz-in 0.5s ease both;
  }
  .oz-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.25);
    display: flex; align-items: center; justify-content: center;
    color: #4ade80; font-size: 2rem;
    box-shadow: 0 0 40px rgba(34,197,94,0.2);
  }
  .oz-success-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: #0f172a; }
  .oz-success-desc { font-size: 0.88rem; color: #64748b; line-height: 1.6; max-width: 320px; }
  .oz-success-reset {
    font-size: 0.8rem; color: rgba(245,158,11,0.8); background: none; border: none;
    cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: underline; text-underline-offset: 3px;
    transition: color 0.2s;
  }
  .oz-success-reset:hover { color: #f59e0b; }

  /* ─── KAMP section ─── */
  .oz-kamp-section { animation: oz-in 0.5s ease both; }
  .oz-kamp-intro {
    text-align: center; margin-bottom: 2rem;
  }
  .oz-kamp-intro-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.7rem; font-weight: 700; color: #0f172a;
    margin-bottom: 0.4rem;
  }
  .oz-kamp-intro-desc {
    font-size: 0.88rem; color: #64748b; line-height: 1.6;
  }

  .oz-kamp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }

  .oz-kamp-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 1.5rem 1.25rem;
    cursor: pointer;
    transition: all 0.22s ease;
    display: flex; flex-direction: column; gap: 0.85rem;
    position: relative; overflow: hidden;
    text-align: left;
    font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .oz-kamp-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(6,182,212,0.05) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.22s;
  }
  .oz-kamp-card:hover { border-color: rgba(6,182,212,0.4); transform: translateY(-3px); box-shadow: 0 8px 32px rgba(6,182,212,0.12); }
  .oz-kamp-card:hover::before { opacity: 1; }

  .oz-kamp-badge {
    display: inline-flex; align-items: center;
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    width: fit-content;
  }
  .oz-kamp-badge.lgs { background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #a5b4fc; }
  .oz-kamp-badge.tyt { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.28); color: #6ee7b7; }
  .oz-kamp-badge.ayt { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.28); color: #fde68a; }
  .oz-kamp-badge.sifir { background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.28); color: #fca5a5; }

  .oz-kamp-name {
    font-size: 1rem; font-weight: 700; color: #0f172a; line-height: 1.3;
  }
  .oz-kamp-desc {
    font-size: 0.78rem; color: #64748b; line-height: 1.5;
  }
  .oz-kamp-cta {
    display: flex; align-items: center; gap: 7px;
    font-size: 0.8rem; font-weight: 600; color: #25d366;
    margin-top: auto;
    transition: gap 0.2s;
  }
  .oz-kamp-card:hover .oz-kamp-cta { gap: 10px; }
`;

const SUBJECTS = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Edebiyat', 'Tarih', 'Coğrafya', 'İngilizce'];

const GRADE_GROUPS = [
  { label: 'Ortaokul', options: ['5. Sınıf', '6. Sınıf', '7. Sınıf', '8. Sınıf'] },
  { label: 'Lise',     options: ['9. Sınıf', '10. Sınıf', '11. Sınıf', '12. Sınıf'] },
  { label: 'Sınav Grupları', options: ['LGS', 'TYT', 'AYT', 'DGS', 'KPSS'] },
];

const FEATURES = [
  { icon: FaUserGraduate, text: 'Alanında uzman öğretmenlerle birebir ders' },
  { icon: FaCheck,        text: 'Kişisel ilerleme takibi ve haftalık raporlama' },
  { icon: FaClock,        text: 'Esnek saat ve gün seçenekleri' },
];

const CAMPS = [
  {
    name: 'Sıfır Matematik Kampı',
    badge: 'sifir', badgeLabel: 'Temel',
    desc: 'Matematiğe sıfırdan başlayanlar için temelden ustalığa giden yol.',
  },
  {
    name: 'TYT Matematik Kampı',
    badge: 'tyt', badgeLabel: 'TYT',
    desc: 'TYT matematik konularını sistematik biçimde hazırlayan yoğun program.',
  },
  {
    name: 'AYT Matematik Kampı',
    badge: 'ayt', badgeLabel: 'AYT',
    desc: 'Sayısal adaylar için AYT matematikte puan artırma kampı.',
  },
  {
    name: 'TYT Fizik Kampı',
    badge: 'tyt', badgeLabel: 'TYT',
    desc: 'TYT fizik konularını pekiştiren soru odaklı kamp programı.',
  },
  {
    name: 'TYT Kimya Kampı',
    badge: 'tyt', badgeLabel: 'TYT',
    desc: 'TYT kimya konularında kavramsal anlama ve soru çözme becerisi.',
  },
  {
    name: 'LGS Matematik Kampı',
    badge: 'lgs', badgeLabel: 'LGS',
    desc: "LGS'e hazırlanan 8. sınıflar için matematik kamp programı.",
  },
  {
    name: 'LGS Fen Kampı',
    badge: 'lgs', badgeLabel: 'LGS',
    desc: 'Fizik, kimya ve biyoloji konularını kapsayan LGS fen bilimleri kampı.',
  },
];

export default function OzelDers() {
  const [activeTab, setActiveTab] = useState('birebir');
  const [formData, setFormData] = useState({
    name: '', grade: '', subjects: [],
    frequencyType: 'haftada', hours: 2,
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleSubject = (subject) =>
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.grade || formData.subjects.length === 0) return;
    const message = encodeURIComponent(
      `Merhaba! Özel ders talep formu:\n\n` +
      `📋 İsim Soyisim: ${formData.name}\n` +
      `🎓 Sınıf: ${formData.grade}\n` +
      `📚 Dersler: ${formData.subjects.join(', ')}\n` +
      `⏰ Yoğunluk: ${formData.frequencyType} ${formData.hours} saat`
    );
    window.open(`https://wa.me/905333785730?text=${message}`, '_blank');
    setSubmitted(true);
  };

  const handleCampClick = (campName) => {
    const message = encodeURIComponent(
      `Merhaba! "${campName}" hakkında bilgi almak istiyorum.`
    );
    window.open(`https://wa.me/905333785730?text=${message}`, '_blank');
  };

  return (
    <>
      <style>{STYLES}</style>
      <Helmet><title>Özel Ders Al — Metamorfoz Akademisi</title></Helmet>

      {/* ── Koyu Hero Bölümü ── */}
      <div className="oz-hero-section">
        <div className="oz-bg-grid" />
        <div className="oz-orb-1" />
        <div className="oz-orb-2" />
        <div className="oz-inner">
          <div className="oz-header">
            <div className="oz-pill">
              <span className="oz-pill-dot" />
              Premium Eğitim
            </div>
            <h1 className="oz-h1">
              <span className="oz-h1-gold">Özel Ders</span> Al
            </h1>
            <p className="oz-subtitle">
              Uzman öğretmenlerle birebir ders al ya da yoğun kamp programlarına katıl.
            </p>
          </div>
          <div className="oz-tabs">
            <button
              className={`oz-tab${activeTab === 'birebir' ? ' active' : ''}`}
              onClick={() => setActiveTab('birebir')}
            >
              <FaChalkboardTeacher />
              Birebir Özel Ders
            </button>
            <button
              className={`oz-tab${activeTab === 'kamplar' ? ' active' : ''}`}
              onClick={() => setActiveTab('kamplar')}
            >
              <FaCampground />
              Kamplar
            </button>
          </div>
        </div>
      </div>

      {/* ── Dalga Geçiş ── */}
      <div className="oz-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f1f5f9" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* ── Açık İçerik Bölümü ── */}
      <div className="oz-content-section">
        <div className="oz-inner">
          {/* ── Birebir tab ── */}
          {activeTab === 'birebir' && (
            <div className="oz-birebir">
              <div className="oz-left">
                <div className="oz-features">
                  {FEATURES.map(({ icon: Icon, text }, i) => (
                    <div className="oz-feat" key={i}>
                      <div className="oz-feat-icon"><Icon /></div>
                      <div className="oz-feat-text">{text}</div>
                    </div>
                  ))}
                </div>
                <div className="oz-info-card">
                  <div className="oz-info-icon"><FaChalkboardTeacher /></div>
                  <div>
                    <div className="oz-info-title">Hızlı İletişim</div>
                    <div className="oz-info-desc">
                      Formu doldurup WhatsApp'tan bize ulaşın, en kısa sürede yanıt verelim.
                    </div>
                  </div>
                </div>
              </div>
              <div className="oz-form-wrap">
                {submitted ? (
                  <div className="oz-success">
                    <div className="oz-success-icon"><FaWhatsapp /></div>
                    <div>
                      <div className="oz-success-title">WhatsApp Açıldı!</div>
                      <p className="oz-success-desc">
                        Mesajı göndermek için WhatsApp'ta onaylayın. En kısa sürede size dönülecektir.
                      </p>
                    </div>
                    <button className="oz-success-reset" onClick={() => setSubmitted(false)}>
                      Yeni talep gönder
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="oz-form-title">Talep Formu</div>
                    <div className="oz-form-desc">Formu doldurun, WhatsApp üzerinden iletişime geçelim.</div>
                    <hr className="oz-divider" />
                    <div className="oz-field">
                      <label className="oz-label">İsim ve Soyisim</label>
                      <input
                        type="text"
                        className="oz-input"
                        placeholder="Adınızı ve soyadınızı girin"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="oz-field">
                      <label className="oz-label">Kaçıncı Sınıf?</label>
                      <select
                        className="oz-input"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        required
                      >
                        <option value="" disabled>Sınıf seçin...</option>
                        {GRADE_GROUPS.map((g) => (
                          <optgroup key={g.label} label={g.label}>
                            {g.options.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div className="oz-field">
                      <label className="oz-label">
                        Talep Edilen Dersler
                        {formData.subjects.length > 0 && (
                          <span className="oz-label-count">({formData.subjects.length} seçildi)</span>
                        )}
                      </label>
                      <div className="oz-subjects">
                        {SUBJECTS.map((s) => {
                          const active = formData.subjects.includes(s);
                          return (
                            <button
                              key={s} type="button"
                              className={`oz-subject${active ? ' active' : ''}`}
                              onClick={() => toggleSubject(s)}
                            >
                              {active && <FaCheck style={{ fontSize: 10, color: '#06b6d4' }} />}
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="oz-field">
                      <label className="oz-label">Ders Yoğunluğu</label>
                      <div className="oz-freq-row">
                        <div className="oz-toggle">
                          {['günde', 'haftada'].map((t) => (
                            <button
                              key={t} type="button"
                              className={`oz-toggle-btn${formData.frequencyType === t ? ' active' : ''}`}
                              onClick={() => setFormData({ ...formData, frequencyType: t })}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        <select
                          className="oz-input"
                          style={{ width: 'auto', padding: '0.55rem 0.85rem' }}
                          value={formData.hours}
                          onChange={(e) => setFormData({ ...formData, hours: Number(e.target.value) })}
                        >
                          {[1,2,3,4,5,6,7,8].map((h) => (
                            <option key={h} value={h}>{h} saat</option>
                          ))}
                        </select>
                        <span className="oz-freq-badge">
                          {formData.hours} saat / {formData.frequencyType}
                        </span>
                      </div>
                    </div>
                    <button type="submit" className="oz-submit">
                      <FaWhatsapp />
                      WhatsApp ile Gönder
                    </button>
                    <p className="oz-fine-print">
                      Formu göndererek WhatsApp üzerinden iletişim kurulacaktır.
                    </p>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ── Kamplar tab ── */}
          {activeTab === 'kamplar' && (
            <div className="oz-kamp-section">
              <div className="oz-kamp-intro">
                <div className="oz-kamp-intro-title">Yoğun Kamp Programları</div>
                <p className="oz-kamp-intro-desc">
                  Sınava odaklı, yoğunlaştırılmış kamp programlarımızla kısa sürede maksimum verim al.
                  <br />İlgilendiğin kampa tıkla, WhatsApp üzerinden bilgi al.
                </p>
              </div>
              <div className="oz-kamp-grid">
                {CAMPS.map((camp) => (
                  <button
                    key={camp.name}
                    className="oz-kamp-card"
                    onClick={() => handleCampClick(camp.name)}
                  >
                    <span className={`oz-kamp-badge ${camp.badge}`}>{camp.badgeLabel}</span>
                    <div className="oz-kamp-name">{camp.name}</div>
                    <div className="oz-kamp-desc">{camp.desc}</div>
                    <div className="oz-kamp-cta">
                      <FaWhatsapp />
                      Bilgi Al
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
