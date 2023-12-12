import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import TmcService from "../API/tmc_service";
import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import SideMenu from "../components/side_menu";
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
    <Stack
      direction={"row"}
      height="100vh"
      spacing="0"
      backgroundColor="menu_white"
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
      <SideMenu />
      <VStack
        overflowY="scroll"
        marginLeft={[200, 200, 200, 210, 220]}
        backgroundColor="menu_white"
        width="100%"
      >
        <Header title="Свойства" />
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
            Свойства
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
                Добавить новое свойство
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
    </Stack>
  );
};

export default TmcsPage;
