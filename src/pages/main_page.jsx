import { Text, VStack } from "@chakra-ui/react";
import MainInfo from "../components/main_info";
import Recent from "../components/recent";
import Header from "../components/header/header";
import Footer from "../components/footer";
import MaterialSearch from "../components/material_search";

const MainPage = () => {
  return (
    <VStack backgroundColor="menu_white">
      <Header title="Главная страница" />
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
        <MaterialSearch />
        <Text fontSize={14} fontWeight={400} marginBottom="20px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim
          enim sit amet venenatis urna cursus eget nunc scelerisque.
        </Text>
        <Recent />
        <MainInfo />
      </VStack>
      <Footer />
    </VStack>
  );
};
export default MainPage;
