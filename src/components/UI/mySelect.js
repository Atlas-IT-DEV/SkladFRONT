import React, { useEffect, useRef } from "react";

import { components } from "chakra-react-select";

const MenuList = (props) => {
  const menuListRef = useRef(null);

  useEffect(() => {
    if (menuListRef.current) {
      menuListRef.current.querySelector("div").onscroll = () => {};
    }
  }, [menuListRef]);

  return (
    <div ref={menuListRef} zIndex={3}>
      <components.MenuList {...props}>
        <div>{props.children}</div>
      </components.MenuList>
    </div>
  );
};
export default MenuList;
