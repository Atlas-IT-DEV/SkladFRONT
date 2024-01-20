import { Text, VStack } from "@chakra-ui/react";
import MainInfo from "../components/main_info";
import Recent from "../components/recent";
import MaterialSearch from "../components/material_search";

const MainPage = () => {
  return (
    <VStack padding={25} alignItems="flex-start" spacing="40px" flexGrow={1}>
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Dignissim enim sit
        amet venenatis urna cursus eget nunc scelerisque.
      </Text>
      <MainInfo />
    </VStack>
  );
};
export default MainPage;
