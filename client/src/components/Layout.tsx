import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
