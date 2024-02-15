import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Text, VStack, Tooltip } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import WriteoffService from "../API/services/writeoff_service";
import WriteoffCreateForm from "../components/forms/writeOff/writeoff_create_form";
import TableWriteoffs from "../components/tables/tableWriteoffs/table_writeoffs";

const WriteoffsPage = () => {
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
        fontSize="22px !important"
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Списания
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Страница создания и редактирования списаний
      </Text>
      <TableWriteoffs />
    </VStack>
  );
};

export default WriteoffsPage;
