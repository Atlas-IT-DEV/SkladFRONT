import { VStack, HStack, Stack, Text } from "@chakra-ui/react";

import SideMenu from "../components/side_menu";
import MainInfo from "../components/main_info";
import Recent from "../components/recent";

const MainPage = () => {
  return (
    <Stack direction={"row"} minH="100vh">
      <SideMenu />
      <VStack padding={25} alignItems="flex-start">
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
