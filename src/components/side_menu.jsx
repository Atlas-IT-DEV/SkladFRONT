import { VStack, Text, Image, HStack } from "@chakra-ui/react";
import side_menu_back from "./../images/side_menu_back.jpg";
import logo from "./../images/logo.svg";

const SideMenu = () => {
  return (
    <VStack
      bgImage={side_menu_back}
      minH="100vh"
      width="15%"
      paddingLeft="18px"
      paddingTop="20px"
      paddingBottom="15px"
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start">
        <Image src={logo} />
        <Text
          textColor="#D3D2D2"
          fontSize="24px"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="normal"
          textAlign="left"
        >
          Склады
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <HStack>{/* скоро здесь доверстается меню  */}</HStack>
      </VStack>
    </VStack>
  );
};
export default SideMenu;
