import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import Header from "../components/header/header";
import Footer from "../components/footer";
import WarehouseService from "../API/services/warehouse_service";
import TableWarehouses from "../components/tables/tableWarehouses/table_warehouses";
import WarehouseCreateForm from "../components/forms/warehouse/warehouse_create_form";

const WarehousePage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [warehouseList, setWarehouseList] = useState([]);

  const [getWarehouseList, warehouseListError] = useFetching(async () => {
    const response = await WarehouseService.getWarehouses();
    setWarehouseList(response.data);
  });

  useEffect(() => {
    getWarehouseList();
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
        <WarehouseCreateForm
          setVisibleModal={setVisibleCreateModal}
          getWarehouseList={getWarehouseList}
        />
      </MyModal>
      <VStack overflowY="scroll" backgroundColor="menu_white" width="100%">
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
            Склады
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
                Добавить ноый склад
              </Button>
            </HStack>
          </HStack>
          {warehouseListError ? (
            <div>{warehouseListError}</div>
          ) : (
            <TableWarehouses
              setVisibleCreateModal={setVisibleCreateModal}
              getWarehouseList={getWarehouseList}
              warehouseList={warehouseList}
            />
          )}
        </VStack>
        <Footer />
      </VStack>
    </Stack>
  );
};

export default WarehousePage;
