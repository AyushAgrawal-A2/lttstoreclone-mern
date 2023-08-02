import { useState, useEffect, useRef } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import NavbarTitle from './NavbarTitle';
import NavbarIcon from './NavbarIcon';
import Logo from './Logo';
import Sidebar from './Sidebar';
import Searchbar from './Searchbar';
import AppTheme from './AppTheme';

interface NavbarProps {
  setOverflow: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({ setOverflow }: NavbarProps) {
  const mainEl = document.getElementById('main');
  const scrollY = useRef(0);
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!mainEl) return;
      if (
        scrollUp &&
        (mainEl.scrollTop >= scrollY.current || mainEl.scrollTop === 0)
      )
        setScrollUp(false);
      else if (!scrollUp && mainEl.scrollTop < scrollY.current)
        setScrollUp(true);
      scrollY.current = mainEl.scrollTop;
    }
    mainEl?.addEventListener('scroll', onScroll);
    return () => mainEl?.removeEventListener('scroll', onScroll);
  }, [mainEl, scrollUp]);

  return (
    <div
      id="navbar"
      className={`${
        scrollUp && 'top-0 border-b animate-slideInY bg-black'
      } sticky z-20 bg-bgPrimary`}>
      <div className="flex flex-row items-center justify-between px-5 md:px-12 py-2 md:py-5">
        <div className="md:hidden w-24">
          <Sidebar setOverflow={setOverflow} />
        </div>
        <NavbarIcon to="/">
          <Logo size={50} />
        </NavbarIcon>
        <div className="hidden md:flex flex-row gap-[10px] lg:gap-[50px] text-xl font-semibold">
          <NavbarTitle
            to="/"
            name="Home"
          />
          <NavbarTitle
            to="/collections/accessories"
            name="Gear"
          />
          <NavbarTitle
            to="/collections/clothing"
            name="Clothing"
          />
          <NavbarTitle
            to="/collections/all"
            name="All Products"
          />
        </div>
        <div className="flex flex-row w-24 md:w-32">
          <AppTheme />
          <Searchbar setOverflow={setOverflow} />
          <div className="hidden md:block px-2">
            <NavbarIcon
              to="/account"
              faIcon={faUser}
            />
          </div>
          <div className="pl-2">
            <NavbarIcon
              to="/cart"
              faIcon={faCartShopping}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
