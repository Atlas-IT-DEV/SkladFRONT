import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import TmcService from "../API/services/tmc_service";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import Header from "../components/header/header";
import Footer from "../components/footer";
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
  }, []);

  return (
    <VStack backgroundColor="menu_white" width="100%" height="100vh">
      <MyModal
        visibleModal={visibleCreateModal}
        setVisibleModal={setVisibleCreateModal}
      >
        <TmcCreateForm
          setVisibleModal={setVisibleCreateModal}
          getTmcList={getTmcList}
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
          ТМЦ
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
              Добавить ноый ТМЦ
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
      <Footer />
    </VStack>
  );
};

export default TmcsPage;
