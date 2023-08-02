import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const mainEl = document.getElementById('main');
  const navbarEl = document.getElementById('navbar');

  useEffect(() => {
    function handleResize() {
      const width = window.outerWidth;
      if (width >= 768) {
        if (mainEl) mainEl.style.overflow = 'auto';
      } else if (sidebarIsOpen) {
        if (mainEl) mainEl.style.overflow = 'hidden';
        setHeight(
          window.innerHeight +
            5 -
            Math.max(
              navbarEl?.previousElementSibling?.getBoundingClientRect()
                .bottom ?? 0,
              0
            )
        );
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarIsOpen, mainEl, navbarEl]);

  function displaySideBar() {
    if (mainEl) mainEl.style.overflow = 'hidden';
    setSidebarIsOpen(true);
    setHeight(
      window.innerHeight +
        5 -
        Math.max(
          navbarEl?.previousElementSibling?.getBoundingClientRect().bottom ?? 0,
          0
        )
    );
  }

  function hideSideBar() {
    if (mainEl) mainEl.style.overflow = 'auto';
    setSidebarIsOpen(false);
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        size={'lg'}
        className={'hover:scale-[1.15] px-2' + (sidebarIsOpen && ' hidden')}
        onClick={displaySideBar}
      />
      <FontAwesomeIcon
        icon={faXmark}
        size={'lg'}
        className={'hover:scale-[1.15] px-2' + (!sidebarIsOpen && ' hidden')}
        onClick={hideSideBar}
      />
      <div
        style={{ height: height }}
        className={
          'fixed bg-bgPrimary w-full bottom-0 left-0 flex flex-col justify-between pt-24 px-7 text-lg font-semibold text-fgTertiary z-[-1]' +
          `${sidebarIsOpen ? ' block animate-slideInX' : ' hidden'}`
        }>
        <div className="flex flex-col gap-4 py-8 items-center">
          <Link
            to={'/'}
            onClick={hideSideBar}>
            Home
          </Link>
          <Link
            to={'/collections/accessories'}
            onClick={hideSideBar}>
            Gear
          </Link>
          <Link
            to={'/collections/clothing'}
            onClick={hideSideBar}>
            Clothing
          </Link>
          <Link
            to={'/collections/all-products-1'}
            onClick={hideSideBar}>
            All Products
          </Link>
        </div>
        <div className="py-8 text-sm">
          <Link
            to={'/account/login'}
            onClick={hideSideBar}>
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
