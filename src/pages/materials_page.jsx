import { VStack, Stack, HStack } from "@chakra-ui/react";

import SideMenu from "../components/side_menu";

const MaterialsPage = () => {
  return (
    <Stack direction={"row"} minH='100vh'>
      <SideMenu />
    </Stack>
  );
};
export default MaterialsPage;
