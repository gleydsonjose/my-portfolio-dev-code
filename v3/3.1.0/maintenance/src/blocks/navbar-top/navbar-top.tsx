import React, {FC} from 'react';
import './navbar-top.css';
import NavbarTopLeftGroup from './components/navbar-top-left-group';
import NavbarTopRightGroup from './components/navbar-top-right-group';

interface NavbarTopProps {
  languageDataNavbarTop: {};
}

const NavbarTop: FC<NavbarTopProps> = ({
  languageDataNavbarTop
}) => {
  return (
    <nav className="navbar-top">
      <NavbarTopLeftGroup
        languageDataNavbarTopLeftGroup={languageDataNavbarTop}/>
      <NavbarTopRightGroup/>
    </nav>
  );
}

export default NavbarTop;