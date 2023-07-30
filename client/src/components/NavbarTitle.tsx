import { NavLink } from 'react-router-dom';

type NavbarTitleProps = {
  to: string;
  name: string;
};

export default function NavbarTitle({ to, name }: NavbarTitleProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `tracking-wide p-1.5 underline-offset-[3px] ${
          isActive ? 'underline' : ''
        } hover:underline hover:animate-grow`
      }>
      {name}
    </NavLink>
  );
}
