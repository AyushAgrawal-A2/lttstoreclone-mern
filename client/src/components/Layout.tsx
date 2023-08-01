import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div
      id="main"
      className="h-screen w-full overflow-auto flex flex-col">
      <Header />
      <Navbar />
      <div className="grow max-w-[1800px] w-full mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
