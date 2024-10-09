import {
  DesktopNavigationMenu,
  MobileNavigationMenu,
} from "@/components/NavigationMenu";
import { Logo } from "@/components/Logo";
import s from "./Header.module.css";

export function Header({ children }) {
  return (
    <header className={s.header}>
      <DesktopNavigationMenu>{children}</DesktopNavigationMenu>
      <MobileNavigationMenu>{children}</MobileNavigationMenu>
      <Logo />
    </header>
  );
}
