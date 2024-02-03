import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import TableUsers from "../components/tables/table_users";

const UserControlPage = () => {
  return (
    <VStack
      padding={25}
      alignItems="flex-start"
      spacing="20px"
      flexGrow={1}
      width="100%"
    >
      <Text
        color="#000"
        fontSize='22px !important'
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Пользователи
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Страница управления пользователями
      </Text>
      <TableUsers/>
    </VStack>
  );
};
export default UserControlPage;