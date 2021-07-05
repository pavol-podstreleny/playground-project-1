import Card from "../../cards/card";
import "./popupMenu.css";

export interface MenuItem<T> {
  name: string;
  handler: (item: T) => void;
}

export interface PopUpMenuProps<T> {
  menuItems: MenuItem<T>[];
  isVisible: boolean;
  item: T;
}

const PopUpMenu = <T extends object>({
  isVisible,
  menuItems,
  item,
}: PopUpMenuProps<T>) => {
  return (
    <div className={isVisible ? "popup-menu visible" : "popup-menu"}>
      <Card>
        <ul className="ul-general">
          {menuItems.map((handledItem) => {
            return (
              <li
                key={handledItem.name}
                onClick={() => handledItem.handler(item)}
              >
                {handledItem.name}
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default PopUpMenu;
