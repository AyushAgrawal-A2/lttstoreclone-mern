import './global.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Blogs from './pages/Blogs';
import Account from './pages/Account';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            Component={Home}
          />
          <Route
            path="collections/:category?"
            Component={Collections}
          />
          <Route
            path="products/:product"
            Component={Product}
          />
          <Route
            path="blogs/the-newsletter-archive"
            Component={Blogs}
          />
          <Route
            path="blogs/the-newsletter-archive/:blog"
            Component={Blog}
          />
          <Route
            path="account/*"
            Component={Account}
          />
          <Route
            path="cart"
            Component={Cart}
          />
          <Route
            path="*"
            Component={NotFound}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
