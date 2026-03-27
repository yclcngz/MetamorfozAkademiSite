import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import InnerLayout from './components/InnerLayout';
import ButterflyCorsor from './components/ButterflyCorsor';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import OzelDers from './pages/OzelDers';
import OgretmenPDF from './pages/OgretmenPDF';
import OgrenciPDF from './pages/OgrenciPDF';
import OgrenciPDFKategori from './pages/OgrenciPDFKategori';
import TYTCikmisKarmaPDFSet from './pages/TYTCikmisKarmaPDFSet';
import AYTCikmisKarmaPDFSet from './pages/AYTCikmisKarmaPDFSet';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <HelmetProvider>
      <ButterflyCorsor />
      <Router>
        <Routes>
          {/* Ana sayfa: Header/Footer yok */}
          <Route path="/" element={<Home />} />

          {/* İç sayfalar: Header + Footer var */}
          <Route element={<InnerLayout />}>
            <Route path="/ozel-ders" element={<OzelDers />} />
            <Route path="/ogretmen-pdf" element={<OgretmenPDF />} />
            <Route path="/ogrenci-pdf" element={<OgrenciPDF />} />
            <Route path="/ogrenci-pdf/tyt/cikmis-karma-pdf-set" element={<TYTCikmisKarmaPDFSet />} />
            <Route path="/ogrenci-pdf/ayt/cikmis-karma-pdf-set" element={<AYTCikmisKarmaPDFSet />} />
            <Route path="/ogrenci-pdf/:kategori" element={<OgrenciPDFKategori />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
