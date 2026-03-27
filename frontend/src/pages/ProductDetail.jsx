import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { FaWhatsapp, FaExclamationTriangle, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
import RainbowButton from '../components/RainbowButton';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        // Beklenen "features" array'i backend'ten dönmüyorsa varsayılan ekle.
        data.features = data.features || [
          'Tamamı MEB kazanımlarına uygun',
          'ÖSYM Yeni Nesil Soru tipleri',
          'Video çözüm destekli detaylı anlatımlar',
          'Sınav formatında denemeler'
        ];
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ürün yüklenirken hata oluştu:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product || product.message) {
    return (
      <div className="text-center py-40">
        <h2 className="text-2xl font-bold text-foreground">Ürün bulunamadı</h2>
      </div>
    );
  }

  const WHATSAPP_NUMBER = "905333785730";
  const whatsappMessage = `Merhaba, Metamorfoz Akademi'den "${product.title}" isimli PDF'i (${product.price.toFixed(2)} ₺) satın almak istiyorum.`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Helmet>
        <title>{product.title} | Metamorfoz Akademi</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12 bg-card rounded-3xl p-8 lg:p-12 shadow-sm border border-border">
          
          {/* Cover Image */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <FaFilePdf className="text-destructive" /> PDF Format
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-3/5 flex flex-col pt-4">
            <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">{product.category}</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.title}</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{product.description}</p>
            
            <div className="text-4xl font-extrabold text-foreground mb-8 pb-8 border-b border-border">
              {product.price.toFixed(2)} ₺
            </div>

            <ul className="space-y-4 mb-10">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                  <FaCheckCircle className="text-primary text-xl flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Critical Warning */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 mb-8 flex items-start gap-4 shadow-sm">
              <FaExclamationTriangle className="text-destructive text-3xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-destructive font-bold text-lg mb-1">ÖNEMLİ UYARI</h4>
                <p className="text-destructive">
                  Bu ürün fiziksel bir kitap değildir, PDF formatındadır. Kargo ile gönderim yapılmaz. 
                  Satın alma işlemini tamamladıktan sonra PDF dosyası WhatsApp üzerinden size iletilecektir.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <RainbowButton 
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full sm:w-auto shadow-lg shadow-green-500/20"
              innerClassName="py-4 px-8 text-lg flex items-center justify-center gap-3 bg-zinc-950 text-white hover:bg-zinc-900 border-none"
            >
              <FaWhatsapp className="text-3xl text-[#25D366]" />
              WhatsApp'tan Satın Al
            </RainbowButton>
          </div>
        </div>
      </div>
    </>
  );
}
