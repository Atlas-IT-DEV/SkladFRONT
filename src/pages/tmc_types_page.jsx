import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import TmcTypeService from "../API/services/tmcType_service";
import { Button, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import TableTmcTypes from "../components/tables/tableTmcTypes/table_tmc_types";
import TmcTypeCreateForm from "../components/forms/tmcTypes/tmc_type_create_form";

const TmcTypesPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [tmcTypeList, setTmcTypeList] = useState([]);

  const [getTmcTypeList, tmcTypeListError] = useFetching(async () => {
    const response = await TmcTypeService.getTmcTypes();
    setTmcTypeList(response.data);
  });

  useEffect(() => {
    getTmcTypeList();
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
        <TmcTypeCreateForm
          visibleModal={visibleCreateModal}
          setVisibleModal={setVisibleCreateModal}
          getTmcTypeList={getTmcTypeList}
        />
      </MyModal>
      <Text
        color="#000"
        fontSize="22px !important"
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Типы материалов (Типы ТМЦ)
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Страница создания и редактирования типов материалов (ТМЦ)
      </Text>
      <HStack color={"black"} width="100%">
        <HStack color={"black"} width="100%">
          <Tooltip label="Чтобы создать тип материала (тип ТМЦ), задайте его название и укажите, какими свойствами оно обладает">
            <Button
              variant="menu_yellow"
              onClick={() => setVisibleCreateModal(true)}
            >
              Добавить новый тип ТМЦ
            </Button>
          </Tooltip>
        </HStack>
      </HStack>
      {tmcTypeListError ? (
        <div>{tmcTypeListError}</div>
      ) : (
        <TableTmcTypes
          setVisibleCreateModal={setVisibleCreateModal}
          getTmcTypeList={getTmcTypeList}
          tmcTypeList={tmcTypeList}
        />
      )}
    </VStack>
  );
};

export default TmcTypesPage;
