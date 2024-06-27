import s from "./Header.module.css";
import Logo from "../Logo/Logo";
import DesktopNavigation from "../NavigationMenu/Desktop/DesktopNavigationMenu";
import MobileNavigation from "../NavigationMenu/Mobile/MobileNavigationMenu";

function Header({ children }) {
  return (
    <header className={s.header}>
      <MobileNavigation>{children}</MobileNavigation>
      <DesktopNavigation>{children}</DesktopNavigation>
      <Logo />
    </header>
  );
}

export default Header;
