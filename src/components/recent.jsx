import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  VStack,
  Text,
  Button,
  Flex,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import MyModal from "./myModal/my_modal";
import ProductEditFrom from "./product_edit_form";
import edit from "./../images/edit.svg";
import delete_svg from "./../images/delete.svg";

const Recent = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <VStack alignContent="flex-start" alignItems="flex-start" width="100%">
      {" "}
      <Text fontWeight={700} fontSize={24} color="black">
        Недавнее
      </Text>
      <MyModal visibleModal={visibleModal} setVisibleModal={setVisibleModal}>
        <ProductEditFrom setVisibleModal={setVisibleModal} />
      </MyModal>
      <VStack width="100%" spacing="2px">
        <HStack
          backgroundColor="white"
          justify="space-between"
          width="100%"
          h="40px"
          paddingRight="10px"
        >
          <HStack width="40%" justify="space-around">
            <Text>1.</Text>
            <Text>Холст синтетический</Text>
            <Text>ID:12312234</Text>
            <Text>28.03.2077</Text>
          </HStack>
          <HStack spacing="10px">
            <Image src={edit} alt="Редактировать" title="Редактировать" />{" "}
            <Image src={delete_svg} alt="Скрыть" title="Скрыть" />
          </HStack>
        </HStack>
        <HStack
          backgroundColor="white"
          justify="space-between"
          width="100%"
          h="40px"
          paddingRight="10px"
        >
          <HStack width="40%" justify="space-around">
            <Text>1.</Text>
            <Text>Холст синтетический</Text>
            <Text>ID:12312234</Text>
            <Text>28.03.2077</Text>
          </HStack>
          <HStack spacing="10px">
            <Image src={edit} alt="Редактировать" title="Редактировать" />{" "}
            <Image src={delete_svg} alt="Скрыть" title="Скрыть" />
          </HStack>
        </HStack>
        <HStack
          backgroundColor="white"
          justify="space-between"
          width="100%"
          h="40px"
          paddingRight="10px"
        >
          <HStack width="40%" justify="space-around">
            <Text>1.</Text>
            <Text>Холст синтетический</Text>
            <Text>ID:12312234</Text>
            <Text>28.03.2077</Text>
          </HStack>
          <HStack spacing="10px">
            <Image src={edit} alt="Редактировать" title="Редактировать" />{" "}
            <Image src={delete_svg} alt="Скрыть" title="Скрыть" />
          </HStack>
        </HStack>
        <HStack
          backgroundColor="white"
          justify="space-between"
          width="100%"
          h="40px"
          paddingRight="10px"
        >
          <HStack width="40%" justify="space-around">
            <Text>1.</Text>
            <Text>Холст синтетический</Text>
            <Text>ID:12312234</Text>
            <Text>28.03.2077</Text>
          </HStack>
          <HStack spacing="10px">
            <Image src={edit} alt="Редактировать" title="Редактировать" />{" "}
            <Image src={delete_svg} alt="Скрыть" title="Скрыть" />
          </HStack>
        </HStack>
        <HStack
          backgroundColor="white"
          justify="space-between"
          width="100%"
          h="40px"
          paddingRight="10px"
        >
          <HStack width="40%" justify="space-around">
            <Text>1.</Text>
            <Text>Холст синтетический</Text>
            <Text>ID:12312234</Text>
            <Text>28.03.2077</Text>
          </HStack>
          <HStack spacing="10px">
            <Image src={edit} alt="Редактировать" title="Редактировать" />{" "}
            <Image src={delete_svg} alt="Скрыть" title="Скрыть" />
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
export default Recent;
