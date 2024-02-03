import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import CraftifyService from "../API/services/craftify_service";
import TableCraftifies from "../components/tables/tableCraftifies/table_craftifies";
import CraftifyCreateForm from "../components/forms/craftify/craftify_create_form";
import Example from "../components/helper_button_modal";

const СraftifiesPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [craftifyList, setCraftifyList] = useState([]);

  const [getCraftifyList, craftifyListError] = useFetching(async () => {
    const response = await CraftifyService.getCraftifies();
    setCraftifyList(response.data);
  });

  useEffect(() => {
    getCraftifyList();
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
        <CraftifyCreateForm
          setVisibleModal={setVisibleCreateModal}
          getCraftifyList={getCraftifyList}
        />
      </MyModal>
      <Text
        color="#000"
        fontSize='22px !important'
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Способы обработки
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Создание  способов обработки материалов
      </Text>
      <HStack color={"black"} width="100%">
        <HStack color={"black"} width="100%">
          <Button
            variant="menu_yellow"
            onClick={() => setVisibleCreateModal(true)}
          >
            Добавить новый
          </Button>
        </HStack>
      </HStack>
      {craftifyListError ? (
        <div>{craftifyListError}</div>
      ) : (
        <TableCraftifies
          setVisibleCreateModal={setVisibleCreateModal}
          getCraftifyList={getCraftifyList}
          craftifyList={craftifyList}
        />
      )}
    </VStack>
  );
};

export default СraftifiesPage;
