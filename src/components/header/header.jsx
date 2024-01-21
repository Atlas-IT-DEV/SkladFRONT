import { HStack, Image, Stack, useDimensions, VStack } from "@chakra-ui/react";
import starbucks from "../../images/starbucks.svg";
import logo from "./../../images/Logotype.svg";
import useWindowDimensions from "../../hooks/window_dimensions";
import { GoChevronDown } from "react-icons/go";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import NavBar from "./navBar/navBar";
import { authenticationPaths, paths } from "./paths";
import MyLink from "./link/my_link";
import { useNavigate } from "react-router";

const Header = () => {
  const { width, height } = useWindowDimensions();
  const navigate = useNavigate();
  const [modalMenu, setModalMenu] = useState([false, null]);
  const componentRef = useRef(null);
  const dimensions = useDimensions(componentRef, true);
  useEffect(() => {
    if (width >= 966) {
      setModalMenu([false, null]);
    }
  }, [width]);
  const [cookie, setCookie] = useCookies(["token"]);
  return (
    <Stack
      bg="white"
      justifyContent="space-between"
      align="center"
      width="100%"
      paddingLeft={["10px", "15px", "20px", "25px", "30px"]}
      paddingRight={["10px", "15px", "20px", "25px", "30px"]}
      paddingTop={5}
      paddingBottom={5}
      boxShadow="0px 0px 25px 0px rgba(0, 0, 0, 0.10)"
      direction="row"
      spacing="20px"
      ref={componentRef}
    >
      <Image src={logo} />
      {width >= 1920 ? (
        <HStack width={"100%"} justifyContent={"space-between"}>
          <NavBar />
        </HStack>
      ) : width >= 1150 ? (
        <VStack spacing="20px">
          <NavBar />
        </VStack>
      ) : null}
      <HStack>
        <Image
          minW={"30px"}
          src={starbucks}
          borderRadius="50%"
          border="2px solid #FFBF00"
        />
        {width < 1150 ? (
          <GoChevronDown
            width="20px"
            onClick={() => {
              let copy = Array.from(modalMenu);
              if (copy[0]) {
                copy[0] = false;
                copy[1] = null;
              } else {
                copy[0] = true;
                copy[1] = (
                  <VStack
                    padding="10px"
                    position="absolute"
                    top={dimensions.borderBox.height}
                    right="0px"
                    zIndex="20"
                    backgroundColor="white"
                  >
                    {paths.map((item) => {
                      if (
                        (item?.haveAccess?.has("AUTH") && cookie.role) ||
                        item?.haveAccess?.has(cookie.role)
                      ) {
                        return (
                          <MyLink
                            key={item.name}
                            to={item.path}
                            name={item.name}
                          />
                        );
                      }
                    })}
                    {authenticationPaths.map((item) => {
                      if (
                        (item?.haveAccess?.has("AUTH") && cookie.role) ||
                        item?.haveAccess?.has(cookie.role)
                      ) {
                        return (
                          <MyLink
                            key={item.name}
                            onClick={item.onClick}
                            to={item.path}
                            name={item.name}
                          />
                        );
                      }
                    })}
                  </VStack>
                );
              }
              setModalMenu(copy);
            }}
          />
        ) : null}
        {modalMenu[1]}
      </HStack>
    </Stack>
  );
};

export default Header;
