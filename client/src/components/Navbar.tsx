import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faMagnifyingGlass,
  faCartShopping,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import NavbarTitle from './NavbarTitle';
import NavbarIcon from './NavbarIcon';
import Logo from './Logo';
import Sidebar from './Sidebar';

export default function Navbar() {
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

  // Search Bar
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  // Display Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  function setLightTheme() {
    document.documentElement.setAttribute('data-theme', 'light');
    window.localStorage.setItem('prefered-theme', 'light');
    setTheme('light');
  }
  function setDarkTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('prefered-theme', 'dark');
    setTheme('dark');
  }
  useEffect(() => {
    const checkDarkTheme = () => {
      const storedTheme = window.localStorage.getItem('prefered-theme');
      const operatingSystemTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      if (storedTheme) {
        storedTheme === 'light' ? setLightTheme() : setDarkTheme();
      } else if (operatingSystemTheme.matches) {
        setDarkTheme();
      }
      operatingSystemTheme.addEventListener(
        'change',
        (e) => e.matches && setDarkTheme()
      );
    };
    checkDarkTheme();
  }, []);

  return (
    <div
      id="navbar"
      className={`${
        scrollUp && 'top-0 border-b animate-slideInY bg-black'
      } sticky z-20 bg-bgPrimary`}>
      <div className="flex flex-row items-center justify-between px-5 md:px-12 py-2 md:py-5">
        <div className="md:hidden w-24">
          <Sidebar />
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
          <FontAwesomeIcon
            icon={theme === 'dark' ? faSun : faMoon}
            size={'lg'}
            className="hover:scale-[1.15] pr-2"
            onClick={() => {
              theme === 'light' ? setDarkTheme() : setLightTheme();
            }}
          />
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={'lg'}
              className="hover:scale-[1.15] px-2"
              onClick={() => setDisplaySearchBar(true)}
            />
            <div
              className={`absolute top-0 left-0 h-full w-full bg-gradient justify-center items-center ${
                displaySearchBar ? 'flex' : 'hidden'
              }`}>
              <form className="relative bg-bgSecondary rounded-md">
                <input
                  id="search-items"
                  placeholder=" "
                  className="peer bg-bgSecondary pl-3 pb-1 rounded-md outline-0 text-fgSecondary"
                />
                <label
                  htmlFor="search-items"
                  className="absolute top-1 left-3 text-fgSecondary text-xs peer-focus:text-xs peer-focus:top-1 peer-placeholder-shown:text-lg peer-placeholder-shown:top-2">
                  Search
                </label>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size={'xl'}
                  className="hover:scale-[1.15] text-fgSecondary p-2"
                  onClick={() => {
                    return 1;
                  }}
                />
              </form>
              <FontAwesomeIcon
                icon={faXmark}
                size={'2xl'}
                className="hover:scale-[1.15] p-4"
                onClick={() => setDisplaySearchBar(false)}
              />
            </div>
          </div>
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
