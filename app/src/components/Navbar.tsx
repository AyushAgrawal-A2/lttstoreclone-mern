import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faMagnifyingGlass,
  faCartShopping,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  // Search Bar
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  // Display Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const setLightTheme = () => {
    document.documentElement.setAttribute('data-theme', 'light');
    window.localStorage.setItem('prefered-theme', 'light');
    setTheme('light');
  };
  const setDarkTheme = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('prefered-theme', 'dark');
    setTheme('dark');
  };
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
    <div className="relative">
      <div className="flex flex-row items-center justify-between px-[50px] py-5">
        <div className="w-[164px]">
          <Link to="/">
            <img
              src="/assets/images/LTT_Logo.png"
              alt="LTT Logo"
              width={50}
              height={50}
              className="py-[7.5px] hover:scale-105"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-[50px] text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `tracking-wide p-1.5 underline-offset-[3px] ${
                isActive ? 'underline' : ''
              } hover:underline hover:scale-105`
            }>
            Home
          </NavLink>
          <NavLink
            to="/collections/accessories"
            className={({ isActive }) =>
              `tracking-wide p-1.5 underline-offset-[3px] ${
                isActive ? 'underline' : ''
              } hover:underline hover:scale-105`
            }>
            Gear
          </NavLink>
          <NavLink
            to="/collections/clothing"
            className={({ isActive }) =>
              `tracking-wide p-1.5 underline-offset-[3px] ${
                isActive ? 'underline' : ''
              } hover:underline hover:scale-105`
            }>
            Clothing
          </NavLink>
          <NavLink
            to="/collections/all"
            className={({ isActive }) =>
              `tracking-wide p-1.5 underline-offset-[3px] ${
                isActive ? 'underline' : ''
              } hover:underline hover:scale-105`
            }>
            All products
          </NavLink>
        </div>
        <div className="flex flex-row justify-between w-[164px]">
          <FontAwesomeIcon
            icon={theme === 'dark' ? faSun : faMoon}
            size={'lg'}
            className="hover:scale-[1.15]"
            onClick={() => {
              theme === 'light' ? setDarkTheme() : setLightTheme();
            }}
          />
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={'lg'}
              className="hover:scale-[1.15]"
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
          <Link to="/account">
            <FontAwesomeIcon
              icon={faUser}
              size={'lg'}
              className="hover:scale-[1.15]"
            />
          </Link>
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              size={'lg'}
              className="hover:scale-[1.15]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
