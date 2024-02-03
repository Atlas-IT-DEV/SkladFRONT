import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Text, VStack, Tooltip } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import WriteoffService from "../API/services/writeoff_service";
import WriteoffCreateForm from "../components/forms/writeOff/writeoff_create_form";
import TableWriteoffs from "../components/tables/tableWriteoffs/table_writeoffs";

const WriteoffsPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [writeoffList, setWriteoffList] = useState([]);

  const [getWriteOffList, warehouseListError] = useFetching(async () => {
    const response = await WriteoffService.getWriteoffs();
    setWriteoffList(response.data);
  });

  useEffect(() => {
    getWriteOffList();
  }, []);

  return (
    <VStack
      padding={25}
      alignItems="flex-start"
      spacing="20px"
      flexGrow={1}
      width="100%"
    >
      <MyModal
        visibleModal={visibleCreateModal}
        setVisibleModal={setVisibleCreateModal}
      >
        <WriteoffCreateForm
          visibleModal={visibleCreateModal}
          setVisibleModal={setVisibleCreateModal}
          getWriteOffList={getWriteOffList}
        />
      </MyModal>
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
      <HStack color={"black"} width="100%">
        <HStack color={"black"} width="100%">
          <Tooltip
            label="Чтобы создать списание, заполните следующие поля: причина списания, клиент, склад, материал и количество"
            aria-label="Подсказка"
          >
            <Button
              variant="menu_yellow"
              onClick={() => setVisibleCreateModal(true)}
            >
              Создать списание
            </Button>
          </Tooltip>
        </HStack>
      </HStack>
      {warehouseListError ? (
        <div>{warehouseListError}</div>
      ) : (
        <TableWriteoffs
          setVisibleCreateModal={setVisibleCreateModal}
          getWriteOffList={getWriteOffList}
          writeoffList={writeoffList}
        />
      )}
    </VStack>
  );
};

export default WriteoffsPage;
