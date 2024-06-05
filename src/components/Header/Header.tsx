import s from "./Header.module.css";
import Logo from "../Logo/Logo";
import DesktopNavigation from "../NavigationMenu/Desktop/DesktopNavigationMenu";
import MobileNavigation from "../NavigationMenu/Mobile/MobileNavigationMenu";

function Header({ children }) {
  return (
    <div className={s.navSection}>
      <MobileNavigation>{children}</MobileNavigation>
      <DesktopNavigation>{children}</DesktopNavigation>
      <Logo />
    </div>
  );
}

export default Header;
