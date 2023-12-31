import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import TablePurchases from "../components/tables/tablePurchases/table_purchases";

const PurchasesPage = () => {
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
        Закупки
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Возможно здеась будет тоже какой то поясняющий текст
      </Text>
      <TablePurchases />
    </VStack>
  );
};
export default PurchasesPage;
