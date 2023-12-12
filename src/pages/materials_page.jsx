import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MyModal from "../components/myModal/my_modal";
import MaterialEditForm from "../components/forms/material/material_edit_form";
import MaterialCreateForm from "../components/forms/material/material_create_form";
import Header from "../components/header/header";
import Footer from "../components/footer";
import TableMaterials from "../components/tables/tableMaterials/table_materials";
import { useFetching } from "../hooks/useFetching";
import MaterialService from "../API/material_service";
import SideMenu from "../components/side_menu";
import { Select } from "chakra-react-select";
import WarehouseService from "../API/warehouse_service";
import PurchaseCreateForm from "../components/forms/purchase/purchase_create_form";
import MaterialToWarehouse from "../components/forms/material/material_to_warehouse";

const MaterialsPage = () => {
  const [visibleEditModal, setVisibleEditModal] = useState();
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [visibleCreatePurchaseModal, setVisibleCreatePurchaseModal] =
    useState();
  const [visibleToWarehouse, setVisibleToWarehouse] = useState(false);
  const [userId, setUserId] = useState(1);
  const [materialId, setMaterialId] = useState(-1);
  const [materialList, setMaterialList] = useState([]);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [warehouseId, setWarehouseId] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalCountMaterials, setTotalCountMaterials] = useState(0);
  const [warehouseList, setWarehouseList] = useState([
    { value: -1, label: "Все склады" },
    { value: null, label: "Нераспределенные" },
  ]);

  const [getMaterialList, materialListError] = useFetching(async () => {
    await MaterialService.getMaterials(
      warehouseId,
      currentPage,
      currentPageSize,
    ).then((response) => {
      setMaterialList(response.data.materials);
      setTotalPages(response.data.totalPages);
      setTotalCountMaterials(response.data.totalItems);
    });
  });

  const [getWarehouseList, warehouseListError] = useFetching(async () => {
    await WarehouseService.getWarehouses().then((response) => {
      setWarehouseList([
        ...warehouseList,
        ...response.data.map((warehouse) => {
          return { value: warehouse.id, label: warehouse.name };
        }),
      ]);
    });
  });

  useEffect(() => {
    getWarehouseList();
  }, []);

  useEffect(() => {
    getMaterialList();
  }, [warehouseId, currentPage, currentPageSize]);
  return (
    <Stack
      direction={"row"}
      height="100vh"
      spacing="0"
      backgroundColor="menu_white"
      width="100%"
    >
      <SideMenu />
      <MyModal
        visibleModal={visibleEditModal}
        setVisibleModal={setVisibleEditModal}
      >
        <MaterialEditForm
          setVisibleModal={setVisibleEditModal}
          materialId={materialId}
          getMaterialList={getMaterialList}
        />
      </MyModal>
      <MyModal
        visibleModal={visibleCreateModal}
        setVisibleModal={setVisibleCreateModal}
      >
        <MaterialCreateForm
          setVisibleModal={setVisibleCreateModal}
          materialId={materialId}
          getMaterialList={getMaterialList}
        />
      </MyModal>
      <MyModal
        visibleModal={visibleCreatePurchaseModal}
        setVisibleModal={setVisibleCreatePurchaseModal}
      >
        <PurchaseCreateForm
          userId={userId}
          setVisibleModal={setVisibleCreatePurchaseModal}
          materialId={materialId}
        />
      </MyModal>
      <MyModal
        visibleModal={visibleToWarehouse}
        setVisibleModal={setVisibleToWarehouse}
      >
        <MaterialToWarehouse
          visibleModal={visibleToWarehouse}
          setVisibleModal={setVisibleToWarehouse}
          materialId={materialId}
          getMaterialList={getMaterialList}
        />
      </MyModal>
      <VStack
        overflowY="scroll"
        marginLeft={[200, 200, 200, 210, 220]}
        backgroundColor="menu_white"
        width="100%"
      >
        <Header title="Материалы" />
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
            Материалы
          </Text>
          <Text fontSize={14} fontWeight={400} marginBottom="20px">
            Возможно здеась будет тоже какой то поясняющий текст
          </Text>
          <HStack color={"black"} width="100%">
            <HStack color={"black"} width="100%">
              <Button variant="menu_yellow">Рулонные материалы</Button>
              <Button
                variant="menu_yellow"
                onClick={() => setVisibleCreateModal(true)}
              >
                Добавить новый
              </Button>
              <Button variant="menu_yellow">Скрытые</Button>
              <Select
                options={warehouseList}
                onChange={(e) => {
                  setWarehouseId(e.value);
                }}
                placeholder="Склады"
              ></Select>
            </HStack>
            <Button variant="menu_yellow">Рулонные материалы</Button>
          </HStack>
          {materialListError ? (
            <div>{materialListError}</div>
          ) : (
            <TableMaterials
              totalCountMaterials={totalCountMaterials}
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
              totalPages={totalPages}
              materialList={materialList}
              setVisibleEditModal={setVisibleEditModal}
              setVisibleCreatePurchaseModal={setVisibleCreatePurchaseModal}
              setMaterialId={setMaterialId}
              getMaterialList={getMaterialList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              warehouseId={warehouseId}
              setVisibleToWarehouse={setVisibleToWarehouse}
            />
          )}
        </VStack>
        <Footer />
      </VStack>
    </Stack>
  );
};
export default MaterialsPage;
