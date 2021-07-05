import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDetectOutsideClickWithCallback } from "../hooks/useDetectOutsideClickWithCallback";
import Customer from "../model/customer";
import DostButton from "./common/buttons/dotsButton/dotsButton";
import PopUpMenu, { MenuItem } from "./common/menus/popupMenu/popupMenu";

export interface CustomerTableMenuItemsProps {
  menuItems: MenuItem<Customer>[];
  customer: Customer;
}

const CustomerTableMenuItems: React.FC<CustomerTableMenuItemsProps> = ({
  menuItems,
  customer,
}) => {
  const navRef = useRef(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isClickedOutside, setClickOutside] = useDetectOutsideClickWithCallback(
    navRef,
    false,
    callBack
  );

  const handleClick = () => {
    setMenuVisible(() => !isMenuVisible);
    setClickOutside(true);
  };

  function callBack() {
    setClickOutside(!isClickedOutside);
    setMenuVisible(!isMenuVisible);
  }

  return (
    <>
      <DostButton onDotsButtonClick={handleClick} />
      <nav ref={navRef}>
        <PopUpMenu
          isVisible={isMenuVisible}
          menuItems={menuItems}
          item={customer}
        />
      </nav>
    </>
  );
};

export default CustomerTableMenuItems;
