import { VStack, Stack, Text, Grid, GridItem } from "@chakra-ui/react";
import useWindowDimensions from "../hooks/window_dimensions";

const MainInfo = () => {
  const { height, width } = useWindowDimensions();
  return (
    <VStack
      direction={width < 768 ? "column" : "row"}
      alignItems="flex-start"
      width="100%"
    >
      <Text
        fontSize={[18, 20, 22, 24, 26]}
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Важная информация
      </Text>

      <Stack direction={width < 768 ? "column" : "row"}>
        <VStack
          bg="linear-gradient(137deg, #D9D9D9 44.07%, #A5A5A5 100.84%)"
          width={width < 768 ? width / 3 : width / 6}
          height={width < 768 ? width / 3 : width / 6}
        ></VStack>
        <VStack
          bg="linear-gradient(137deg, #D9D9D9 44.07%, #A5A5A5 100.84%)"
          width={width < 768 ? width / 3 : width / 6}
          height={width < 768 ? width / 3 : width / 6}
        ></VStack>
        <VStack
          bg="linear-gradient(137deg, #D9D9D9 44.07%, #A5A5A5 100.84%)"
          width={width < 768 ? width / 3 : width / 6}
          height={width < 768 ? width / 3 : width / 6}
        ></VStack>
        <VStack
          bg="linear-gradient(137deg, #D9D9D9 44.07%, #A5A5A5 100.84%)"
          width={width < 768 ? width / 3 : width / 6}
          height={width < 768 ? width / 3 : width / 6}
        ></VStack>
      </Stack>
    </VStack>
  );
};

export default MainInfo;
