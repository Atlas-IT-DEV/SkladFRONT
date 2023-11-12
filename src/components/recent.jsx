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
} from "@chakra-ui/react";

const Recent = () => {
  return (
    <VStack>
      <Text></Text>
      <TableContainer width='100%'>
        <Table variant="simple" width='100%'>
          <Tbody width='100%'>
            <Tr>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
            </Tr>
            <Tr>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
              <Td>холст</Td>
            </Tr>
            <Tr>
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
