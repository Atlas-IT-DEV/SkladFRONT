import { VStack, useColorMode, Stack, Text, Button } from "@chakra-ui/react";

import SideMenu from "../components/side_menu";
import MainInfo from "../components/main_info";
import Recent from "../components/recent";
import MyModal from "../components/myModal/my_modal";
import ProductEditForm from "../components/product_edit_form";
import React, { useState } from "react";

const MainPage = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack direction={"row"} minH="100vh">
      <SideMenu />
      {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button> */}
      <VStack padding={25} alignItems="flex-start" overflow="scroll">
        <Text
          color="#000"
          fontSize={[24, 26, 28, 32, 36]}
          fontWeight={700}
          lineHeight="normal"
          fontStyle="normal"
          marginBottom={[10, 15, 25, 35, 45]}
        >
          Главная страница
        </Text>
        <Button onClick={() => setVisibleModal(true)}></Button>
        <MyModal visibleModal={visibleModal} setVisibleModal={setVisibleModal}>
          <ProductEditForm setVisibleModal={setVisibleModal} />
        </MyModal>
        <MainInfo />
        <Recent />
      </VStack>
    </Stack>
  );
};
export default MainPage;
