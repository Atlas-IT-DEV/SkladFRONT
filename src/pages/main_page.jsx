import { VStack, Stack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import SideMenu from "../components/side_menu";
import MainInfo from "../components/main_info";
import Recent from "../components/recent";
import Header from "../components/header/header";
import Footer from "../components/footer";
import MyModal from "../components/myModal/my_modal";
import ProductEditFrom from "../components/product_edit_form";

const MainPage = () => {
  // const [visibleModal, setVisibleModal] = useState();
  return (
    <Stack
      direction={"row"}
      height="auto"
      spacing="0"
      backgroundColor="menu_white"
      width="100%"
    >
      <SideMenu />
      {/* <MyModal visibleModal={visibleModal} setVisibleModal={setVisibleModal}>
        <ProductEditFrom setVisibleModal={setVisibleModal} />
      </MyModal> */}
      <VStack
        marginLeft={[200, 200, 200, 210, 220]}
        backgroundColor="menu_white"
      >
        <Header title="Главная страница" />
        {/* <Button onClick={() => setVisibleModal(true)}></Button> */}
        <VStack
          padding={25}
          alignItems="flex-start"
          overflow="scroll"
          spacing="40px"
        >
          <Text
            color="#000"
            fontSize={[24, 26, 28, 32, 36]}
            fontWeight={700}
            lineHeight="normal"
            fontStyle="normal"
          >
            Главная страница
          </Text>
          <Text fontSize={14} fontWeight={400} marginBottom="20px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque.
          </Text>
          <Recent />
          <MainInfo />
        </VStack>
        <Footer />
      </VStack>
    </Stack>
  );
};
export default MainPage;
