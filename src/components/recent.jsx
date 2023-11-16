import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import EditModal from "./editModal/edit_modal";

const Recent = () => {
  return (
    <VStack>
      <Text></Text>
      <TableContainer width="100%">
        <Table variant="striped" width="100%" justifyContent="left">
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
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>
                <EditModal />
              </Td>
            </Tr>
            <Tr>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>
                <EditModal />
              </Td>
            </Tr>
            <Tr>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td></Td>
              <Td>
                <EditModal />
              </Td>
            </Tr>
            <Tr>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td></Td>
              <Td></Td>
              <Td>
                <EditModal />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
export default Recent;
