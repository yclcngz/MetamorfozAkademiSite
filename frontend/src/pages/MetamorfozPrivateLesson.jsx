import { Helmet } from 'react-helmet-async';
import RainbowButton from '../components/RainbowButton';

export default function MetamorfozPrivateLesson() {
  return (
    <>
      <Helmet>
        <title>Metamorfoz Özel Ders | Metamorfoz Akademi</title>
        <meta name="description" content="TYT, AYT Matematik ve Fen bilimleri alanlarında birebir online veya yüz yüze özel ders seçenekleri." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-card rounded-3xl p-12 shadow-sm border border-border">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-8">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-6">Metamorfoz Özel Ders</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Sınava hazırlık sürecinizde kişiye özel çalışma programı ve birebir derslerle başarıya daha hızlı ulaşın. 
            TYT ve AYT Matematik branşında uzman kadromuzla yanınızdayız.
          </p>
          
          <div className="bg-muted border border-border rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-foreground mb-2">Çok Yakında...</h3>
            <p className="text-muted-foreground text-sm">
              Bu sayfamızın tasarımı ve içeriği henüz yapım aşamasındadır. Çok yakında özel ders programlarımız, 
              eğitmen kadromuz ve başvuru formumuz ile karşınızda olacağız.
            </p>
          </div>

          <RainbowButton 
            as="a" 
            href="/iletisim" 
            innerClassName="py-3 px-8 text-lg"
          >
            Şimdi İletişime Geçin
          </RainbowButton>
        </div>
      </div>
    </>
  );
}
