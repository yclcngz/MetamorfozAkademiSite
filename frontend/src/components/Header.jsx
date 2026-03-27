import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import RainbowButton from './RainbowButton';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glassmorphism border-b border-amber-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Metamorfoz Akademisi Logo"
              className="w-10 h-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="font-serif font-bold text-xl tracking-tight text-slate-900">
              Metamorfoz <span className="text-gradient">Akademisi</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-600 hover:text-amber-500 transition-colors text-sm font-medium">
              Ana Sayfa
            </Link>
            <Link to="/ogrenci-pdf" className="text-slate-600 hover:text-amber-500 transition-colors text-sm font-medium">
              Öğrenci PDF
            </Link>
            <Link to="/ogretmen-pdf" className="text-slate-600 hover:text-amber-500 transition-colors text-sm font-medium">
              Öğretmen PDF
            </Link>
            <Link to="/hakkimizda" className="text-slate-600 hover:text-amber-500 transition-colors text-sm font-medium">
              Hakkımızda
            </Link>
            <Link to="/iletisim" className="text-slate-600 hover:text-amber-500 transition-colors text-sm font-medium">
              İletişim
            </Link>
            <RainbowButton as="Link" to="/ozel-ders" innerClassName="px-5 py-2 text-sm">
              Özel Ders Al
            </RainbowButton>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-600 hover:text-amber-500 transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menü"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glassmorphism border-t border-amber-500/10 px-4 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-amber-500 transition-colors py-2 border-b border-slate-200">Ana Sayfa</Link>
          <Link to="/ogrenci-pdf" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-amber-500 transition-colors py-2 border-b border-slate-200">Öğrenci PDF</Link>
          <Link to="/ogretmen-pdf" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-amber-500 transition-colors py-2 border-b border-slate-200">Öğretmen PDF</Link>
          <Link to="/hakkimizda" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-amber-500 transition-colors py-2 border-b border-slate-200">Hakkımızda</Link>
          <Link to="/iletisim" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-amber-500 transition-colors py-2">İletişim</Link>
          <RainbowButton as="Link" to="/ozel-ders" onClick={() => setIsOpen(false)} innerClassName="px-5 py-2 text-sm w-full justify-center">
            Özel Ders Al
          </RainbowButton>
        </div>
      </div>
    </header>
  );
}
