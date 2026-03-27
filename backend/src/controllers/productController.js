// const { db } = require('../config/firebase');

// Şimdilik mock veri döndürüyoruz. İleride Firebase bağlanınca burası aktif edilebilir.
const mockProducts = [
  {
    id: '1',
    title: 'AYT Matematik Soru Bankası PDF',
    description: 'ÖSYM çıkmış sorular ve özgün denemeler içeren dijital kitap.',
    price: 49.90,
    imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=800',
    category: 'Denemeler'
  },
  {
    id: '2',
    title: 'TYT Fizik Konu Anlatımlı Soru Bankası PDF',
    description: 'Tüm TYT fizik konularını kapsayan görsel destekli akılda kalıcı notlar.',
    price: 39.90,
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
    category: 'Konu Anlatımları'
  },
  {
    id: '3',
    title: 'ÖSYM Tipi Karma Matematik Denemeleri PDF',
    description: 'Yeni nesil sorularla hazırlanmış, tam sınav provalık 10 adet TYT ve AYT denemesi.',
    price: 59.90,
    imageUrl: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=800',
    category: 'Denemeler'
  }
];

exports.getAllProducts = async (req, res) => {
  try {
    /* 
    Firebase Firestore Entegrasyonu (Aktif etmek için service account JSON gerekir):
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
    */
    
    // Geçici olarak Mock Data
    res.json(mockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    /*
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json({ id: doc.id, ...doc.data() });
    */
    
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};
