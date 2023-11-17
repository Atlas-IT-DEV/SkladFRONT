import { VStack, Stack, Text } from "@chakra-ui/react";

import SideMenu from "../components/side_menu";
import MainInfo from "../components/main_info";
import Recent from "../components/recent";
import Header from "../components/header/header";

const MainPage = () => {
  return (
    <Stack direction={"row"} minH="100vh" spacing="0">
      <SideMenu />
      <VStack>
        <Header title="Главная" />
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
      </VStack>
    </Stack>
  );
};
export default MainPage;
