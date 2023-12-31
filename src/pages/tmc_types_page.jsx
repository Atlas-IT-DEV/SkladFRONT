import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import TmcTypeService from "../API/services/tmcType_service";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import Header from "../components/header/header";
import Footer from "../components/footer";
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
    <VStack backgroundColor="menu_white" width="100%" height="100vh">
      <MyModal
        visibleModal={visibleCreateModal}
        setVisibleModal={setVisibleCreateModal}
      >
        <TmcTypeCreateForm
          setVisibleModal={setVisibleCreateModal}
          getTmcTypeList={getTmcTypeList}
        />
      </MyModal>
      <Header />
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
          Типы ТМЦ
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
              Добавить новый ТМЦ
            </Button>
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
      <Footer />
    </VStack>
  );
};

export default TmcTypesPage;
