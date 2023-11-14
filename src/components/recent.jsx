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
                <EditModal />
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
                <EditModal />
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
                <EditModal />
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
                <EditModal />
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
