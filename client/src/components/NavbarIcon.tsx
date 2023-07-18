import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type NavbarIconProps = {
  to: string;
  faIcon?: IconDefinition;
  children?: React.ReactNode;
};

export default function NavbarIcon({ to, faIcon, children }: NavbarIconProps) {
  return (
    <Link to={to}>
      {faIcon && (
        <FontAwesomeIcon
          icon={faIcon}
          size={'lg'}
          className="hover:scale-[1.15]"
        />
      )}
      {children}
    </Link>
  );
}
