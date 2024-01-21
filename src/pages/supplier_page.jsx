import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import TablePurchases from "../components/tables/tablePurchases/table_purchases";
import TableSuppliers from "../components/tables/tableSuppliers/table_suppliers";

const SupplierPage = () => {
  return (
    <VStack
      padding={25}
      alignItems="flex-start"
      spacing="40px"
      flexGrow={1}
      width="100%"
    >
      <Text
        color="#000"
        fontSize={[24, 26, 28, 32, 36]}
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Поставщики
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Информация о поставщиках
      </Text>
      <TableSuppliers />
    </VStack>
  );
};
export default SupplierPage;