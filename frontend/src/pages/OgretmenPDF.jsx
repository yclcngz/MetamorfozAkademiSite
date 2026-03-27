import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChalkboardTeacher, FaLock, FaArrowRight, FaTimes } from 'react-icons/fa';
import RainbowButton from '../components/RainbowButton';

const MODAL_STYLES = `
  .ogr-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.65); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: ogr-fade 0.2s ease both;
  }
  @keyframes ogr-fade { from { opacity: 0; } to { opacity: 1; } }

  .ogr-modal {
    background: #0d1120;
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 24px;
    padding: 2.5rem 2.25rem;
    width: 100%; max-width: 580px;
    position: relative;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1);
    animation: ogr-pop 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes ogr-pop {
    from { opacity: 0; transform: scale(0.92) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .ogr-close {
    position: absolute; top: 1rem; right: 1rem;
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
    color: rgba(148,163,184,0.7); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; transition: all 0.15s;
  }
  .ogr-close:hover { background: rgba(255,255,255,0.1); color: #fff; }

  .ogr-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.75rem; font-weight: 700; color: #eef2ff;
    margin-bottom: 0.4rem;
  }
  .ogr-modal-sub {
    font-size: 0.88rem; color: rgba(148,163,184,0.65); margin-bottom: 1.75rem; line-height: 1.5;
  }

  .ogr-options { display: flex; flex-direction: column; gap: 0.85rem; }

  .ogr-option {
    display: flex; align-items: center; gap: 1.25rem;
    padding: 1.4rem 1.5rem;
    border-radius: 16px; cursor: pointer;
    border: 1px solid; text-align: left;
    background: transparent; width: 100%;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .ogr-option:hover { transform: translateY(-2px); }

  .ogr-option.branded {
    border-color: rgba(99,102,241,0.35);
    background: rgba(99,102,241,0.06);
  }
  .ogr-option.branded:hover {
    background: rgba(99,102,241,0.12);
    box-shadow: 0 8px 24px rgba(99,102,241,0.2);
    border-color: rgba(99,102,241,0.6);
  }
  .ogr-option.custom {
    border-color: rgba(245,158,11,0.35);
    background: rgba(245,158,11,0.06);
  }
  .ogr-option.custom:hover {
    background: rgba(245,158,11,0.12);
    box-shadow: 0 8px 24px rgba(245,158,11,0.2);
    border-color: rgba(245,158,11,0.6);
  }

  .ogr-opt-icon {
    width: 54px; height: 54px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 1.5rem;
  }
  .ogr-opt-icon.branded { background: rgba(99,102,241,0.15); color: #a5b4fc; }
  .ogr-opt-icon.custom  { background: rgba(245,158,11,0.15); color: #f59e0b; }

  .ogr-opt-body { flex: 1; }
  .ogr-opt-title { font-weight: 700; font-size: 1rem; color: #eef2ff; margin-bottom: 0.25rem; }
  .ogr-opt-desc  { font-size: 0.8rem; color: rgba(148,163,184,0.65); line-height: 1.4; }
  .ogr-opt-arrow { font-size: 1rem; color: rgba(100,116,139,0.5); transition: transform 0.2s, color 0.2s; }
  .ogr-option:hover .ogr-opt-arrow { transform: translateX(4px); color: rgba(148,163,184,0.9); }

  .ogr-soon {
    text-align: center; padding: 1.5rem 0 0.5rem;
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
  }
  .ogr-soon-icon {
    font-size: 2.8rem; line-height: 1;
  }
  .ogr-soon-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 700; color: #eef2ff;
  }
  .ogr-soon-desc {
    font-size: 0.85rem; color: rgba(148,163,184,0.7); line-height: 1.6; max-width: 320px;
  }
  .ogr-soon-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25);
    border-radius: 100px; padding: 5px 14px;
    font-size: 0.75rem; font-weight: 600; color: #f59e0b; letter-spacing: 0.08em;
  }
  .ogr-soon-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #f59e0b;
    box-shadow: 0 0 6px rgba(245,158,11,0.9);
    animation: ogr-dot 2s ease-in-out infinite;
  }
  @keyframes ogr-dot { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

  .ogr-back {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.75rem; color: rgba(148,163,184,0.55);
    background: none; border: none; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    margin-bottom: 1rem; padding: 0;
    transition: color 0.15s;
  }
  .ogr-back:hover { color: rgba(148,163,184,0.9); }

  .ogr-level-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
  .ogr-level-btn {
    padding: 0.9rem 0.5rem;
    border-radius: 12px; cursor: pointer;
    border: 1px solid rgba(99,102,241,0.2);
    background: rgba(99,102,241,0.06);
    color: #c7d2fe; font-size: 0.9rem; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.18s;
    text-align: center;
  }
  .ogr-level-btn:hover {
    background: rgba(99,102,241,0.15);
    border-color: rgba(99,102,241,0.5);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99,102,241,0.2);
  }
`;

const LEVELS = ['LGS', 'TYT', 'AYT', 'DGS', 'KPSS', '9. Sınıf', '10. Sınıf', '11. Sınıf', '12. Sınıf'];

const SUBJECTS_BY_LEVEL = {
  'LGS':      ['Matematik', 'Fen Bilimleri', 'Türkçe', 'Sosyal Bilimler', 'İngilizce'],
  'TYT':      ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih', 'Coğrafya', 'Felsefe', 'İngilizce'],
  'AYT':      ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Edebiyat', 'Tarih', 'Coğrafya', 'Felsefe'],
  'DGS':      ['Sayısal', 'Sözel'],
  'KPSS':     ['Matematik', 'Türkçe', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Eğitim Bilimleri'],
  '9. Sınıf': ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih', 'Coğrafya', 'İngilizce'],
  '10. Sınıf':['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih', 'Coğrafya', 'İngilizce'],
  '11. Sınıf':['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Edebiyat', 'Tarih', 'Coğrafya', 'İngilizce'],
  '12. Sınıf':['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Edebiyat', 'Tarih', 'Coğrafya', 'İngilizce'],
};

const WA = (msg) => window.open(`https://wa.me/905333785730?text=${encodeURIComponent(msg)}`, '_blank');

export default function OgretmenPDF() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [logoChoice, setLogoChoice] = useState('');
  const [levelChoice, setLevelChoice] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const openModal = () => { setStep(1); setLogoChoice(''); setLevelChoice(''); setSelectedSubject(''); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const handleLogoChoice = (choice) => { setLogoChoice(choice); setStep(2); };
  const handleLevelChoice = (level) => { setLevelChoice(level); setStep(3); };

  const handleSubject = (subject) => {
    if (logoChoice === 'custom') {
      closeModal();
      WA(`Merhaba! ${levelChoice} ${subject} için kendi logomla özelleştirilmiş ders anlatım sunumu istiyorum. Fiyat ve detay bilgisi alabilir miyim?`);
    } else {
      setSelectedSubject(subject);
      setStep(4);
    }
  };

  return (
    <>
      <style>{MODAL_STYLES}</style>
      <Helmet>
        <title>Öğretmen PDF — Metamorfoz Akademisi</title>
      </Helmet>

      {showModal && (
        <div className="ogr-overlay" onClick={closeModal}>
          <div className="ogr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ogr-close" onClick={closeModal}><FaTimes /></button>

            {step === 1 ? (
              <>
                <div className="ogr-modal-title">Sunum Versiyonu Seç</div>
                <div className="ogr-modal-sub">Hangi logolu versiyonu talep etmek istiyorsunuz?</div>
                <div className="ogr-options">
                  <button className="ogr-option branded" onClick={() => handleLogoChoice('branded')}>
                    <div className="ogr-opt-icon branded"><FaChalkboardTeacher /></div>
                    <div className="ogr-opt-body">
                      <div className="ogr-opt-title">Metamorfoz Akademisi Logolu</div>
                      <div className="ogr-opt-desc">Kurumun markasıyla hazırlanmış orijinal sunumlar</div>
                    </div>
                    <span className="ogr-opt-arrow">›</span>
                  </button>
                  <button className="ogr-option custom" onClick={() => handleLogoChoice('custom')}>
                    <div className="ogr-opt-icon custom"><FaChalkboardTeacher /></div>
                    <div className="ogr-opt-body">
                      <div className="ogr-opt-title">Kendi Logonuzla</div>
                      <div className="ogr-opt-desc">Kurumunuzun logosu ile kişiselleştirilmiş sunumlar</div>
                    </div>
                    <span className="ogr-opt-arrow">›</span>
                  </button>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <button className="ogr-back" onClick={() => setStep(1)}>‹ Geri</button>
                <div className="ogr-modal-title">Sınıf / Sınav Seç</div>
                <div className="ogr-modal-sub">
                  {logoChoice === 'branded' ? 'Metamorfoz Akademisi Logolu' : 'Kendi Logonuzla'} — hangi seviye için?
                </div>
                <div className="ogr-level-grid">
                  {LEVELS.map((lvl) => (
                    <button key={lvl} className="ogr-level-btn" onClick={() => handleLevelChoice(lvl)}>
                      {lvl}
                    </button>
                  ))}
                </div>
              </>
            ) : step === 3 ? (
              <>
                <button className="ogr-back" onClick={() => setStep(2)}>‹ Geri</button>
                <div className="ogr-modal-title">Ders Seç</div>
                <div className="ogr-modal-sub">{levelChoice} — hangi dersin sunumunu istiyorsunuz?</div>
                <div className="ogr-level-grid">
                  {(SUBJECTS_BY_LEVEL[levelChoice] || []).map((sub) => (
                    <button key={sub} className="ogr-level-btn" onClick={() => handleSubject(sub)}>
                      {sub}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button className="ogr-back" onClick={() => setStep(3)}>‹ Geri</button>
                <div className="ogr-soon">
                  <div className="ogr-soon-icon">📚</div>
                  <div className="ogr-soon-badge">
                    <span className="ogr-soon-dot" />
                    Yakında
                  </div>
                  <div className="ogr-soon-title">{levelChoice} {selectedSubject}</div>
                  <div className="ogr-soon-desc">
                    Bu ders sunumu hazırlanmaktadır. Yüklendiğinde buradan erişebileceksiniz.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <section
        className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16"
        style={{
          background:
            'radial-gradient(ellipse at 60% 30%, rgba(99,102,241,0.07) 0%, transparent 55%), #f8fafc',
        }}
      >
        {/* Dekoratif arka plan */}
        <div
          className="pointer-events-none absolute top-1/4 left-[-200px] w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'rgba(99,102,241,0.07)' }}
        />

        <div className="w-full max-w-lg">
          {/* Ana kart */}
          <div className="glassmorphism rounded-3xl p-10 text-center flex flex-col items-center gap-6 relative overflow-hidden">
            {/* Arka plan dekor */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at 50% -20%, rgba(99,102,241,0.25) 0%, transparent 60%)',
              }}
            />

            {/* İkon */}
            <div className="relative z-10 w-24 h-24 rounded-3xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <FaChalkboardTeacher className="text-indigo-400 text-5xl" />
            </div>

            {/* Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-indigo-400 text-xs font-medium">
              <FaLock className="text-xs" />
              Öğretmenlere Özel
            </div>

            {/* Başlık */}
            <div className="relative z-10">
              <h1 className="font-serif font-bold text-4xl text-slate-900 mb-3">
                Ders Anlatım<br />
                <span className="text-gradient">Sunumları</span>
              </h1>
              <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
                Metamorfoz Akademisi tarafından profesyonel olarak hazırlanmış ders anlatım sunum materyalleri.
              </p>
            </div>

            {/* Altın çizgi ayırıcı */}
            <div className="relative z-10 w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

            {/* CTA Butonu */}
            <div className="relative z-10 w-full">
              <RainbowButton
                as="button"
                onClick={openModal}
                innerClassName="py-3.5 text-base gap-2 w-full justify-center"
              >
                Sunumlara Erişin
                <FaArrowRight className="text-sm" />
              </RainbowButton>
              <p className="text-slate-500 text-xs mt-3">
                Erişim için öğretmen doğrulaması gerekebilir.
              </p>

            </div>
          </div>

          {/* Alt bilgi kartı */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { value: 'PDF', label: 'Format' },
              { value: 'Güncel', label: 'İçerik' },
              { value: 'Ücretsiz', label: 'Erişim' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-sm"
              >
                <div className="text-amber-400 font-bold text-lg">{item.value}</div>
                <div className="text-slate-500 text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
