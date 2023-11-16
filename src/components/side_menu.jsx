import { VStack, Text, Image, HStack, Divider } from "@chakra-ui/react";
import { useState } from "react";
import side_menu_back from "./../images/side_menu_back.jpg";
import logo from "./../images/logo.svg";
import chevron_left from "./../images/chevron-left.svg";
import design_sklad_logo from "./../images/design_sklad_logo.svg";
import poligraphy_sklad_logo from "./../images/poligraphy_sklad_logo.svg";
import promote_sklad_logo from "./../images/promote_sklad_logo.svg";
import souvenirs_sklad_logo from "./../images/souvenirs_sklad_logo.svg";

import useWindowDimensions from "../hooks/window_dimensions";

const SideMenu = () => {
  const { height, width } = useWindowDimensions();
  const { display, setDisplay } = useState(false);
  return (
    <VStack>
      <VStack
        bgImage={side_menu_back}
        minH="100vh"
        minW="200px"
        padding="20px"
        alignItems="flex-start"
        top={0}
        left={0}
        zIndex={99}
        overflow="hidden"
      >
        <HStack justify="space-between" paddingBottom={[10, 15]} w="100%">
          <Image src={logo} w={100} h={61} />
          <Image justifySelf="flex-end" src={chevron_left} />
        </HStack>
        <Divider orientation="horizontal" color="#CCC3C2" />
        <VStack
          alignItems="flex-start"
          paddingBottom={[10, 15]}
          paddingTop={[10, 15]}
        >
          <HStack spacing="13px">
            <Image src={design_sklad_logo} color="white" />
            <Text
              fontSize={[13, 13, 14, 15, 16]}
              fontStyle="normal"
              fontWeight="700"
              textColor="#D3D2D2"
            >
              Дизайн и проектирование
            </Text>
          </HStack>
          <HStack spacing="13px">
            <Image src={poligraphy_sklad_logo} />
            <Text
              fontSize={[13, 13, 14, 15, 16]}
              fontStyle="normal"
              fontWeight="700"
              textColor="#D3D2D2"
            >
              Прикладная полиграфия
            </Text>
          </HStack>
          <HStack spacing="13px">
            <Image src={souvenirs_sklad_logo} />
            <Text
              fontSize={[13, 13, 14, 15, 16]}
              fontStyle="normal"
              fontWeight="700"
              textColor="#D3D2D2"
            >
              Сувенирная продукция
            </Text>
          </HStack>
          <HStack spacing="13px">
            <Image src={promote_sklad_logo} />
            <Text
              fontSize={[13, 13, 14, 15, 16]}
              fontStyle="normal"
              fontWeight="700"
              textColor="#D3D2D2"
            >
              Рекламное производство
            </Text>
          </HStack>
        </VStack>
        <Divider orientation="horizontal" color="#CCC3C2" />
        <VStack
          alignItems="flex-start"
          spacing={[4, 4, 4, 4, 5]}
          paddingBottom={[10, 15]}
          paddingTop={[10, 15]}
        >
          <Text
            fontSize={[13, 13, 14, 15, 16]}
            fontStyle="normal"
            fontWeight="700"
            textColor="#D3D2D2"
            variant="side_menu_hover"
          >
            Товары
          </Text>
          <Text
            fontSize={[13, 13, 14, 15, 16]}
            fontStyle="normal"
            fontWeight="700"
            textColor="#D3D2D2"
            variant="side_menu_hover"
          >
            Поставщики
          </Text>
          <Text
            fontSize={[13, 13, 14, 15, 16]}
            fontStyle="normal"
            fontWeight="700"
            textColor="#D3D2D2"
            variant="side_menu_hover"
          >
            Материалы
          </Text>
          <Text
            fontSize={[13, 13, 14, 15, 16]}
            fontStyle="normal"
            fontWeight="700"
            textColor="#D3D2D2"
            variant="side_menu_hover"
          >
            Пермещение товаров
          </Text>
          <Text
            fontSize={[13, 13, 14, 15, 16]}
            fontStyle="normal"
            fontWeight="700"
            textColor="#D3D2D2"
            variant="side_menu_hover"
          >
            Остатки товаров
          </Text>
          <Text
            fontSize={[13, 13, 14, 15, 16]}
            fontStyle="normal"
            fontWeight="700"
            textColor="#D3D2D2"
            variant="side_menu_hover"
          >
            Уровни доступа
          </Text>
        </VStack>
        <Divider orientation="horizontal" color="#CCC3C2" />
      </VStack>
    </VStack>
  );
};
export default SideMenu;
