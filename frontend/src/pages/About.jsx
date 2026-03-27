import { Helmet } from 'react-helmet-async';
import { FaGraduationCap, FaChalkboardTeacher, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <Helmet>
        <title>Hakkımızda | Metamorfoz Akademi</title>
        <meta name="description" content="Metamorfoz Akademi, TYT, AYT Matematik alanında özenle hazırlanmış PDF dokümanları sunan dijital bir eğitim platformudur." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Geleceğinize Metamorfoz ile yön verin. TYT ve AYT sürecinde ihtiyacınız olan en kaliteli ve özgün içeriklere anında ulaşın.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Biz Kimiz?</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Metamorfoz Akademi, özellikle <strong className="text-foreground">TYT ve AYT Matematik</strong> ve Fen Bilimleri alanlarında, ÖSYM'nin değişen yeni nesil soru tarzlarına uygun, yüksek nitelikli eğitim materyalleri üreten dijital bir yayıncıdır.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Amacımız; öğrencilerin karmaşık konuları daha kolay anlamasını sağlamak, sınav stresini azaltmak ve onları gerçek sınav deneyimine en yakın denemelerle buluşturmaktır. Ürünlerimiz tamamen <strong className="text-primary">PDF formatında</strong> olup, beklemeden, kargo süreci olmadan anında erişilebilir şekilde tasarlanmıştır.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-secondary p-8 rounded-3xl text-center">
                <FaGraduationCap className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">+1000</h3>
                <p className="text-muted-foreground">Başarılı Öğrenci</p>
              </div>
              <div className="bg-secondary p-8 rounded-3xl text-center mt-8">
                <FaChalkboardTeacher className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Uzman</h3>
                <p className="text-muted-foreground">Eğitmen Kadrosu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Quick Info */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Bize Ulaşın</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FaPhone className="text-2xl text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Telefon / WhatsApp</h3>
              <p className="text-muted-foreground">+90 533 378 57 30</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FaEnvelope className="text-2xl text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">E-Posta</h3>
              <p className="text-muted-foreground">info@metamorfozakademi.com</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="text-2xl text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Konum</h3>
              <p className="text-muted-foreground text-sm font-medium">Yüz yüze: Van · Ankara · İstanbul · Yalova · Trabzon</p>
              <p className="text-muted-foreground text-sm mt-1">Online: Türkiye'nin her yerine</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
