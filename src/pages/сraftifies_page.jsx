import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import SideMenu from "../components/side_menu";
import Header from "../components/header/header";
import Footer from "../components/footer";
import CraftifyService from "../API/services/craftify_service";
import TableCraftifies from "../components/tables/tableCraftifies/table_craftifies";
import CraftifyCreateForm from "../components/forms/craftify/craftify_create_form";

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
        <CraftifyCreateForm
          setVisibleModal={setVisibleCreateModal}
          getCraftifyList={getCraftifyList}
        />
      </MyModal>
      <VStack
        overflowY="scroll"
        backgroundColor="menu_white"
        width="100%"
      >
        <Header title="Способы обработки" />
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
            Способы обработки
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
                Добавить новую обработку
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
        <Footer />
      </VStack>
    </Stack>
  );
};

export default СraftifiesPage;
