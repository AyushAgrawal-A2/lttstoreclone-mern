import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Navbar />
      <div className="grow w-full max-w-[1800px] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
