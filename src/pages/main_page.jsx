import { VStack, HStack, Stack } from "@chakra-ui/react";

import SideMenu from "../components/side_menu";

const MainPage = () => {
  return (
    <Stack direction={"row"} minH='100vh'>
      <SideMenu />
    </Stack>
  );
};
export default MainPage;
