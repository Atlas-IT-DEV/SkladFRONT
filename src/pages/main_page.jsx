import { VStack, useColorMode, Stack, Text, Button } from "@chakra-ui/react";

import SideMenu from "../components/side_menu";
import MainInfo from "../components/main_info";
import Recent from "../components/recent";
import EditModal from "../components/editModal/edit_modal";

const MainPage = () => {
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
        <MainInfo />
        <Recent />
      </VStack>
    </Stack>
  );
};
export default MainPage;
