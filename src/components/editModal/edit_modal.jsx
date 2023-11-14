import {
  Select,
  Input,
  SimpleGrid,
  Button,
  Modal,
  extendTheme,
  ChakraProvider,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import useWindowDimensions from "../../hooks/window_dimensions";
import React, { useRef } from "react";
import theme from "../../theme";

const EditModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { height, width } = useWindowDimensions();

  const initialRef = useRef(null);
  const finalRef = useRef(null)

  return (
    <ChakraProvider theme={theme}>
      {/* <> */}
      <Button onClick={onOpen} variant='menu_yellow'>
        Редактировать
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"6xl"}
      >
        <ModalOverlay />
        <ModalContent width="40vw" maxH="500" minW="220px">
          <ModalHeader pt={6} pb={7}>
            Рулонные материалы
          </ModalHeader>
          <ModalCloseButton mt={4} me={2} />
          <ModalBody pb={6}>
            <SimpleGrid
              maxH="300px"
              overflowX="scroll"
              columns={width < 768 ? 1 : 2}
              spacing={5}
              p={1}
              sx={{
                "::-webkit-scrollbar": {
                  w: "2",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "10",
                  bg: `gray.100`,
                },
              }}
            >
              <Input
                height={8}
                bg="#EEE"
                ref={initialRef}
                placeholder="Название"
                _placeholder={{ color: "#9E9E9E" }}
              />
              <Select
                height={8}
                bg="#EEE"
                placeholder="Тип"
                _placeholder={{ color: "white" }}
              >
                <option
                  style={{ color: "black", background: "white" }}
                  value="option1"
                >
                  Option 1
                </option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select
                height={8}
                bg="#EEE"
                placeholder="Покрытие"
                colorScheme="yellow"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select height={8} bg="#EEE" placeholder="Плотность">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              <Select height={8} bg="#EEE" placeholder="Ширина">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              <Select height={8} bg="#EEE" placeholder="Цвет">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Input
                height={8}
                bg="#EEE"
                ref={initialRef}
                placeholder="Название"
                _placeholder={{ color: "#9E9E9E" }}
              />
              <Input
                height={8}
                bg="#EEE"
                ref={initialRef}
                placeholder="Валюта"
                _placeholder={{ color: "#9E9E9E" }}
              />
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button variant='menu_red' onClick={onClose}>
              Отмена
            </Button>
            <Button variant='menu_yellow' me={1}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* </> */}
    </ChakraProvider>
  );
};

export default EditModal;
