import React from "react";
import { HStack } from "@chakra-ui/react";
import { authenticationPaths, paths } from "../paths";
import MyLink from "../link/my_link";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  return (
    <>
      <HStack spacing={5}>
        {paths.map((item) => {
          if (item?.haveAccess?.has(cookie.role)) {
            return <MyLink key={item.name} to={item.path} name={item.name} />;
          } else {
            return;
          }
        })}
      </HStack>
      <HStack spacing={5}>
        {authenticationPaths.map((item) => {
          if (item?.haveAccess?.has(cookie.role)) {
            return (
              <MyLink
                key={item.name}
                onClick={item.onClick}
                to={item.path}
                name={item.name}
              />
            );
          } else {
            return;
          }
        })}
      </HStack>
    </>
  );
};

export default NavBar;
