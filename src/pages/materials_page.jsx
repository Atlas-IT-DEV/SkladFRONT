import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";

import SideMenu from "../components/side_menu";
import { useEffect, useState } from "react";
import MyModal from "../components/myModal/my_modal";
import MaterialEditForm from "../components/forms/materialEditForm/material_edit_form";
import MaterialCreateForm from "../components/forms/materialCreateForm/material_create_form";
import Header from "../components/header/header";
import Footer from "../components/footer";
import TableMaterials from "../components/tableMaterials/table_materials";
import { useFetching } from "../hooks/useFetching";
import MaterialService from "../API/material_service";

const MaterialsPage = () => {
  const [visibleEditModal, setVisibleEditModal] = useState();
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [materialId, setMaterialId] = useState(-1);
  const [materialList, setMaterialList] = useState();
  const [currentPageSize, setCurrentPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [warehouseId, setWarehouseId] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCountMaterials, setTotalCountMaterials] = useState(0);

  const [getMaterialList, paintingError] = useFetching(async () => {
    MaterialService.getMaterials(
      warehouseId,
      currentPage,
      currentPageSize,
    ).then((response) => {
      console.log(response.data);
      setMaterialList(response.data.materials);
      setTotalPages(response.data.totalPages);
      setTotalCountMaterials(response.data.totalItems);
    });
  });

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
      <VStack
        marginLeft={[200, 200, 200, 210, 220]}
        backgroundColor="menu_white"
        width="100%"
      >
        <Header title="Материалы" />
        <VStack
          padding={25}
          alignItems="flex-start"
          overflowY="scroll"
          spacing="40px"
          height="100%"
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
            </HStack>
            <Button variant="menu_yellow">Рулонные материалы</Button>
          </HStack>
          {paintingError ? (
            <div>{paintingError}</div>
          ) : (
            <TableMaterials
              totalCountMaterials={totalCountMaterials}
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
              totalPages={totalPages}
              materialList={materialList}
              setVisibleEditModal={setVisibleEditModal}
              setMaterialId={setMaterialId}
              getMaterialList={getMaterialList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </VStack>
        <Footer />
      </VStack>
    </Stack>
  );
};
export default MaterialsPage;
