import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <div className="grow max-w-[1800px] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
