import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [displaySideBar, setDisplaySideBar] = useState(false);

  function handleSidebar() {
    const mainEl = document.getElementById('main');
    if (displaySideBar) {
      setDisplaySideBar(false);
      if (mainEl) mainEl.style.overflow = 'auto';
    } else {
      setDisplaySideBar(true);
      if (mainEl) mainEl.style.overflow = 'hidden';
    }
  }
  let height = window.innerHeight;
  const navbarEl = document.getElementById('navbar');
  if (navbarEl) height -= navbarEl.getBoundingClientRect().bottom - 5;

  return (
    <>
      <FontAwesomeIcon
        icon={displaySideBar ? faXmark : faBars}
        size={'lg'}
        className="hover:scale-[1.15] px-2"
        onClick={() => handleSidebar()}
      />
      <div
        style={{ height: height }}
        className={
          'fixed bg-bgPrimary w-full bottom-0 left-0 flex flex-col justify-between px-7 font-semibold text-fgTertiary' +
          `${displaySideBar ? ' block animate-slideInX' : ' hidden'}`
        }>
        <div className="flex flex-col gap-2 py-8">
          <Link
            to={'/'}
            onClick={handleSidebar}>
            Home
          </Link>
          <Link
            to={'/collections/accessories'}
            onClick={handleSidebar}>
            Gear
          </Link>
          <Link
            to={'/collections/clothing'}
            onClick={handleSidebar}>
            Clothing
          </Link>
          <Link
            to={'/collections/all-products-1'}
            onClick={handleSidebar}>
            All Products
          </Link>
        </div>
        <div className="py-8 text-sm">
          <Link
            to={'/account/login'}
            onClick={handleSidebar}>
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              className="pr-2"
            />
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
