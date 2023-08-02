import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [overflow, setOverflow] = useState('auto');

  return (
    <div
      style={{ overflow: overflow }}
      className="h-screen w-full flex flex-col">
      <Header />
      <Navbar setOverflow={setOverflow} />
      <div className="grow max-w-[1800px] w-full mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
