import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import TmcService from "../API/services/tmc_service";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import TableTmcs from "../components/tables/tableTmcs/table_tmcs";
import TmcCreateForm from "../components/forms/tmc/tmc_create_form";

const TmcsPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [tmcList, setTmcList] = useState([]);

  const [getTmcList, tmcListError] = useFetching(async () => {
    const response = await TmcService.getTmcs();
    setTmcList(response.data);
  });

  useEffect(() => {
    getTmcList();
  }, [visibleCreateModal]);

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
        <TmcCreateForm
          setVisibleModal={setVisibleCreateModal}
          getTmcList={getTmcList}
        />
      </MyModal>
      <Text
        color="#000"
        fontSize={[24, 26, 28, 32, 36]}
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        ТМЦ
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Страница создания и редактирования ТМЦ
      </Text>
      <HStack color={"black"} width="100%">
        <HStack color={"black"} width="100%">
          <Button
            variant="menu_yellow"
            onClick={() => setVisibleCreateModal(true)}
          >
            Добавить новый ТМЦ
          </Button>
        </HStack>
      </HStack>
      {tmcListError ? (
        <div>{tmcListError}</div>
      ) : (
        <TableTmcs
          setVisibleCreateModal={setVisibleCreateModal}
          getTmcList={getTmcList}
          tmcList={tmcList}
        />
      )}
    </VStack>
  );
};

export default TmcsPage;
