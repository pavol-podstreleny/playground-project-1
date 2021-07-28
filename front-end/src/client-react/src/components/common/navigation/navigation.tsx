import { NavLink } from "react-router-dom";
import "./navigation.css";

interface NavigationMenuItem {
  name: string;
  url: string;
}
interface NavigationProps {
  menuItems: NavigationMenuItem[];
}

const Navigation: React.FC<NavigationProps> = ({ menuItems }) => {
  return (
    <header>
      <nav className="main-nav">
        <ul className="main-nav__item-group">
          {menuItems.map((item) => {
            return (
              <li className="main-nav__item" key={item.name}>
                <NavLink to={item.url} className="main-nav__link">
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
