import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-500 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="font-serif font-bold text-2xl tracking-tight text-slate-900 mb-4">
              Metamorfoz <span className="text-gradient">Akademisi</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
              Öğrencilere özel PDF kaynakları, özel ders imkânı ve profesyonel eğitim materyalleriyle geleceğinize yön verin.
            </p>
          </div>
          <div>
            <h3 className="text-slate-700 font-semibold mb-4 text-xs tracking-wide uppercase">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-amber-500 transition-colors text-sm text-slate-600">Ana Sayfa</Link></li>
              <li><Link to="/ogrenci-pdf" className="hover:text-amber-500 transition-colors text-sm text-slate-600">Öğrenci PDF</Link></li>
              <li><Link to="/ogretmen-pdf" className="hover:text-amber-500 transition-colors text-sm text-slate-600">Öğretmen PDF</Link></li>
              <li><Link to="/ozel-ders" className="hover:text-amber-500 transition-colors text-sm text-slate-600">Özel Ders Al</Link></li>
              <li><Link to="/hakkimizda" className="hover:text-amber-500 transition-colors text-sm text-slate-600">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="hover:text-amber-500 transition-colors text-sm text-slate-600">İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold mb-4 tracking-wide uppercase text-slate-700">İletişim</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col gap-1">
                <span className="text-amber-600 font-medium text-xs uppercase tracking-wide">WhatsApp</span>
                <span className="text-slate-700">+90 533 378 57 30</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-amber-600 font-medium text-xs uppercase tracking-wide">E-posta</span>
                <span className="text-slate-700">info@metamorfozakademi.com</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-amber-600 font-medium text-xs uppercase tracking-wide">Yüz Yüze</span>
                <span className="text-slate-700">Van · Ankara · İstanbul</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-amber-600 font-medium text-xs uppercase tracking-wide">Online</span>
                <span className="text-slate-700">Türkiye'nin her yerine</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 mt-10 pt-8 text-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Metamorfoz Akademisi. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
