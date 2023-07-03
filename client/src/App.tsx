import './global.css';
import '@fontsource/poppins/600.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Collections from './components/Collections';
import Account from './components/Account';
import Cart from './components/Cart';
import NotFound from './components/NotFound';

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
            path="collections/:category"
            Component={Collections}
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
