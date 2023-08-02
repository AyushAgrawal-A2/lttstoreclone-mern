import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  setOverflow: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({ setOverflow }: SidebarProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (!sidebarIsOpen) return;
      if (window.outerWidth >= 768) setOverflow('auto');
      else setOverflow('hidden');
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarIsOpen, setOverflow]);

  function displaySideBar() {
    setOverflow('hidden');
    setSidebarIsOpen(true);
  }

  function hideSideBar() {
    setOverflow('auto');
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
        className={
          'absolute top-0 left-0 bg-bgPrimary h-screen w-full flex flex-col justify-between pt-24 px-7 text-lg font-semibold text-fgTertiary z-[-1]' +
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
        <div className="fixed bottom-4 text-sm">
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
