import "./popupMenu.css";

export interface MenuItem<T> {
  name: string;
  handler: (item: T) => void;
}

interface PopUpMenuProps<T> {
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
    <div className="popup-wrapper">
      <div
        className={
          isVisible
            ? "popup-menu  popup-menu--visible popup-menu--small"
            : "popup-menu  popup-menu--small"
        }
      >
        <div className="popup-menu__card">
          <ul className="popup-menu__item-group">
            {menuItems.map((handledItem) => {
              return (
                <li key={handledItem.name}>
                  <button
                    onClick={() => handledItem.handler(item)}
                    className="popup-menu__link"
                  >
                    {handledItem.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopUpMenu;
