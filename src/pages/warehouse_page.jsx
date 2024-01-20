import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
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
        <WarehouseCreateForm
          setVisibleModal={setVisibleCreateModal}
          getWarehouseList={getWarehouseList}
        />
      </MyModal>
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
        Страница создания и редактирования складов
      </Text>
      <HStack color={"black"} width="100%">
        <HStack color={"black"} width="100%">
          <Button
            variant="menu_yellow"
            onClick={() => setVisibleCreateModal(true)}
          >
            Добавить новый склад
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
  );
};

export default WarehousePage;
