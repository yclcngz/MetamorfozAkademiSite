import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function InnerLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9]">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
