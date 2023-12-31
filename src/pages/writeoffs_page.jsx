import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import WriteoffService from "../API/services/writeoff_service";
import WriteoffCreateForm from "../components/forms/writeOff/writeoff_create_form";

const WriteoffsPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [warehouseList, setWriteoffList] = useState([]);

  const [getWriteoffList, warehouseListError] = useFetching(async () => {
    const response = await WriteoffService.getWriteoffs();
    setWriteoffList(response.data);
  });

  useEffect(() => {
    getWriteoffList();
  }, []);

  return (
    <VStack
      padding={25}
      alignItems="flex-start"
      spacing="40px"
      flexGrow={1}
      width="100%"
    >
      <MyModal
        visibleModal={visibleCreateModal}
        setVisibleModal={setVisibleCreateModal}
      >
        <WriteoffCreateForm
          setVisibleModal={setVisibleCreateModal}
          getWriteoffList={getWriteoffList}
        />
      </MyModal>
      <Text
        color="#000"
        fontSize={[24, 26, 28, 32, 36]}
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Списания
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Возможно здеась будет тоже какой то поясняющий текст
      </Text>
      <HStack color={"black"} width="100%">
        <HStack color={"black"} width="100%">
          <Button
            variant="menu_yellow"
            onClick={() => setVisibleCreateModal(true)}
          >
            Создать списание
          </Button>
        </HStack>
      </HStack>
      {warehouseListError ? (
        <div>{warehouseListError}</div>
      ) : (
        ""
        // <TableWriteoffs
        //   setVisibleCreateModal={setVisibleCreateModal}
        //   getWriteoffList={getWriteoffList}
        //   warehouseList={warehouseList}
        // />
      )}
    </VStack>
  );
};

export default WriteoffsPage;
