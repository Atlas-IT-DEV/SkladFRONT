import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import MyModal from "./myModal/my_modal";
import ProductEditFrom from "./product_edit_form";

const Recent = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <VStack>
      <MyModal visibleModal={visibleModal} setVisibleModal={setVisibleModal}>
        <ProductEditFrom setVisibleModal={setVisibleModal} />
      </MyModal>
      <Text></Text>
      <TableContainer width="100%">
        <Table variant="simple" width="100%" justifyContent="left">
          <Thead>
            <Th>Недавнее</Th>
            <Th>
              <Button variant="menu_yellow">Повторить</Button>
            </Th>
          </Thead>
          <Tbody
            width="100%"
            justifyContent="left"
            alignSelf="flex-end"
            justifySelf="left"
          >
            <Tr>
              <Td>
                <Button
                  onClick={() => setVisibleModal(true)}
                  variant="menu_yellow"
                >
                  Редактировать
                </Button>
              </Td>
              <Td>1.</Td>

              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
            </Tr>
            <Tr>
              <Td>
                <Button
                  onClick={() => setVisibleModal(true)}
                  variant="menu_yellow"
                >
                  Редактировать
                </Button>
              </Td>
              <Td>2.</Td>

              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
            </Tr>
            <Tr>
              <Td>
                <Button
                  onClick={() => setVisibleModal(true)}
                  variant="menu_yellow"
                >
                  Редактировать
                </Button>
              </Td>
              <Td>3.</Td>

              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
            </Tr>
            <Tr>
              <Td>
                <Button
                  onClick={() => setVisibleModal(true)}
                  variant="menu_yellow"
                >
                  Редактировать
                </Button>
              </Td>
              <Td>4.</Td>

              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
export default Recent;
