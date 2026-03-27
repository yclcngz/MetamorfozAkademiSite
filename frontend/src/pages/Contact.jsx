import { Helmet } from 'react-helmet-async';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import RainbowButton from '../components/RainbowButton';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>İletişim | Metamorfoz Akademi</title>
        <meta name="description" content="Metamorfoz Akademi iletişim, WhatsApp sipariş hattı ve destek." />
      </Helmet>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto bg-card rounded-3xl shadow-sm border border-border overflow-hidden flex flex-col md:flex-row">
          
          {/* Contact Info Sidebar */}
          <div className="md:w-2/5 bg-primary text-primary-foreground p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">İletişime Geçin</h2>
            <p className="text-primary-foreground/80 mb-10">Sorularınız veya destek talepleriniz için bize ulaşabilirsiniz.</p>

            <div className="space-y-8 mt-auto">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                  <FaWhatsapp className="text-2xl text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">WhatsApp Destek & Sipariş</h4>
                  <a href="https://wa.me/905333785730" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/90 hover:text-white transition-colors mt-1 block">
                    +90 533 378 57 30
                  </a>
                  <p className="text-sm text-primary-foreground/70 mt-1">Hızlı yanıt için WhatsApp'ı tercih edebilirsiniz.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                  <FaEnvelope className="text-2xl text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">E-Posta</h4>
                  <a href="mailto:info@metamorfozakademi.com" className="text-primary-foreground/90 hover:text-white transition-colors mt-1 block">
                    info@metamorfozakademi.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                  <FaMapMarkerAlt className="text-2xl text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Konum</h4>
                  <p className="text-primary-foreground/90 mt-1 font-medium">Yüz yüze dersler:</p>
                  <p className="text-sm text-primary-foreground/80">Van · Ankara · İstanbul · Yalova · Trabzon</p>
                  <p className="text-primary-foreground/90 mt-2 font-medium">Online dersler:</p>
                  <p className="text-sm text-primary-foreground/80">Türkiye'nin her yerine</p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-sm text-primary-foreground/80">Çalışma Saatleri: Pazartesi - Cumartesi / 09:00 - 18:00</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-3/5 p-10 md:p-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Mesaj Gönderin</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Ad Soyad</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background" placeholder="Adınız Soyadınız" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">E-Posta Adresi</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background" placeholder="ornek@email.com" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Konu</label>
                <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background" placeholder="Hangi konuda yardıma ihtiyacınız var?" required />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Mesajınız</label>
                <textarea id="message" rows="5" className="w-full px-4 py-3 rounded-xl border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none bg-background" placeholder="Mesajınızı buraya yazın..." required></textarea>
              </div>

              <RainbowButton type="submit" className="w-full" innerClassName="w-full py-4 text-lg">
                Mesajı Gönder
              </RainbowButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
