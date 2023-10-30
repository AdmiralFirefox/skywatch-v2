import { NavLink } from "react-router-dom";
import styles from "../../styles/navbar/NavbarLink.module.scss";

interface NavbarLinkProps {
  route: string;
  children: React.ReactNode;
}

const NavbarLink = ({ route, children }: NavbarLinkProps) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        isActive ? styles["nav-icon-active"] : styles["nav-icon"]
      }
    >
      {children}
    </NavLink>
  );
};

export default NavbarLink;
