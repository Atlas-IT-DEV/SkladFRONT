import { VStack, Text, Image, HStack } from "@chakra-ui/react";
import side_menu_back from "./../images/side_menu_back.jpg";
import logo from "./../images/logo.svg";
import design_sklad_logo from "./../images/design_sklad_logo.svg";
import poligraphy_sklad_logo from "./../images/poligraphy_sklad_logo.svg";
import promote_sklad_logo from "./../images/promote_sklad_logo.svg";
import souvenirs_sklad_logo from "./../images/souvenirs_sklad_logo.svg";

import useWindowDimensions from "../hooks/window_dimensions";

const SideMenu = () => {
  const { height, width } = useWindowDimensions();
  return (
    <VStack
      bgImage={side_menu_back}
      minH="100vh"
      width="15%"
      position="fixed"
      top={0}
      minW="200px"
      paddingLeft="18px"
      paddingTop="20px"
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start" paddingBottom={[10, 15]}>
        <Image src={logo} />
        <Text
          textColor="#D3D2D2"
          fontSize={[14, 16, 18, 20, 24]}
          fontStyle="normal"
          fontWeight="700"
          lineHeight="normal"
          textAlign="left"
        >
          Склады
        </Text>
      </VStack>
      <VStack alignItems="flex-start" paddingBottom={[10, 15]}>
        <HStack spacing="13px">
          <Image src={design_sklad_logo} />
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
      <VStack alignItems="flex-start" spacing={[4, 4, 4, 4, 5]}>
        <Text
          textColor="#D3D2D2"
          fontSize={[14, 16, 18, 20, 24]}
          fontStyle="normal"
          fontWeight="700"
          lineHeight="normal"
          textAlign="left"
        >
          Пункты
        </Text>
        <Text
          fontSize={[13, 13, 14, 15, 16]}
          fontStyle="normal"
          fontWeight="700"
          textColor="#D3D2D2"
        >
          Товары
        </Text>
        <Text
          fontSize={[13, 13, 14, 15, 16]}
          fontStyle="normal"
          fontWeight="700"
          textColor="#D3D2D2"
        >
          Поставщики
        </Text>
        <Text
          fontSize={[13, 13, 14, 15, 16]}
          fontStyle="normal"
          fontWeight="700"
          textColor="#D3D2D2"
        >
          Материалы
        </Text>
        <Text
          fontSize={[13, 13, 14, 15, 16]}
          fontStyle="normal"
          fontWeight="700"
          textColor="#D3D2D2"
        >
          Пермещение товаров
        </Text>
        <Text
          fontSize={[13, 13, 14, 15, 16]}
          fontStyle="normal"
          fontWeight="700"
          textColor="#D3D2D2"
        >
          Остатки товаров
        </Text>
        <Text
          fontSize={[13, 13, 14, 15, 16]}
          fontStyle="normal"
          fontWeight="700"
          textColor="#D3D2D2"
        >
          Уровни доступа
        </Text>
      </VStack>
    </VStack>
  );
};
export default SideMenu;
