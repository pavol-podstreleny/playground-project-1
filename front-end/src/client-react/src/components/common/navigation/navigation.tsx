import { NavLink } from "react-router-dom";
import "./navigation.css";

interface NavigationMenuItem {
  name: string;
  url: string;
}
export interface NavigationProps {
  menuItems: NavigationMenuItem[];
}

const Navigation: React.FC<NavigationProps> = ({ menuItems }) => {
  return (
    <header>
      <nav id="main-nav" className="center">
        <ul className="flex-row flex-end">
          {menuItems.map((item) => {
            return (
              <li key={item.name}>
                <NavLink to={item.url}>{item.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
