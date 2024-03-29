import {
  Button,
  Checkbox,
  HStack,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MyModal from "../components/myModal/my_modal";
import MaterialCreateForm from "../components/forms/material/material_create_form";
import TableMaterials from "../components/tables/tableMaterials/table_materials";
import { useFetching } from "../hooks/useFetching";
import MaterialService from "../API/services/material_service";
import Select from "react-select";
import WarehouseService from "../API/services/warehouse_service";
import useWindowDimensions from "../hooks/window_dimensions";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { CiEdit, CiShoppingCart } from "react-icons/ci";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { MdOutlineContentCut } from "react-icons/md";
import { useCookies } from "react-cookie";
import { roles } from "../components/header/paths";
import {
  optionAreaList,
  optionDensityList,
  optionLengthList,
  optionLiquidList,
} from "../components/forms/property/optionTypeList";
import MaterialsToWarehouse from "../components/forms/material/materials_to_warehouse";

const MaterialsPage = () => {
  const [cookie, setCookie] = useCookies();

  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [visibleMaterialsToWarehouse, setVisibleMaterialsToWarehouse] =
    useState();

  const [materialList, setMaterialList] = useState([]);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCountMaterials, setTotalCountMaterials] = useState(0);

  const [searchStr, setSearchStr] = useState("");
  const [showHidden, setShowHidden] = useState(false);
  const [warehouseId, setWarehouseId] = useState(null);

  const [measure, setMeasure] = useState({
    length: "",
    area: "",
    liquid: "",
    density: "",
  });

  const [warehouseList, setWarehouseList] = useState([
    { value: -1, label: "Нераспределенные" },
    { value: null, label: "Все склады" },
  ]);
  const { width, height } = useWindowDimensions();

  const [getMaterialList, materialListError] = useFetching(async () => {
    const currentMaterialList = [];
    let currentTotalPages = 0;
    let currentTotalCountMaterials = 0;
    // Сомнительная логика

    if (warehouseId === null) {
      await Promise.all(
        warehouseList.map(async (warehouse) => {
          if (warehouse.value !== null && warehouse.value !== -1) {
            const response = await MaterialService.getMaterials(
              warehouse.value,
              currentPage,
              currentPageSize,
              searchStr,
              showHidden,
            );
            currentMaterialList.push({
              warehouse: warehouse.label,
              materials: response.data.materials,
            });
            if (currentTotalPages < response.data.totalPages) {
              currentTotalPages = response.data.totalPages;
            }
            if (currentTotalCountMaterials < response.data.totalItems) {
              currentTotalCountMaterials = response.data.totalItems;
            }
          }
        }),
      );
      setMaterialList(currentMaterialList);
      setTotalPages(currentTotalPages);
      setTotalCountMaterials(currentTotalCountMaterials);
    }
    // Старая логика
    else {
      await MaterialService.getMaterials(
        warehouseId,
        currentPage,
        currentPageSize,
        searchStr,
        showHidden,
      ).then((response) => {
        setMaterialList(response.data.materials);
        setTotalPages(response.data.totalPages);
        setTotalCountMaterials(response.data.totalItems);
      });
    }
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
  }, [
    warehouseId,
    currentPage,
    currentPageSize,
    showHidden,
    searchStr,
    warehouseList,
  ]);

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left", zIndex: 99 }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left", zIndex: 99 }}>
          name: {item.name}
        </span>
      </>
    );
  };
  const handleOnSearch = (string, results) => {
    string == "" ? setSearchStr("") : setSearchStr(`name:*${string}*`);
    setCurrentPage(1);
  };

  return (
    <VStack
      padding={25}
      alignItems="flex-start"
      spacing="20px"
      flexGrow={1}
      width="100%"
    >
      <MyModal
        setVisibleModal={setVisibleCreateModal}
        visibleModal={visibleCreateModal}
      >
        <MaterialCreateForm
          visibleModal={visibleCreateModal}
          setVisibleModal={setVisibleCreateModal}
          getMaterialList={getMaterialList}
        />
      </MyModal>
      <MyModal
        setVisibleModal={setVisibleMaterialsToWarehouse}
        visibleModal={visibleMaterialsToWarehouse}
      >
        <MaterialsToWarehouse
          visibleModal={visibleMaterialsToWarehouse}
          setVisibleModal={setVisibleMaterialsToWarehouse}
          warehouseId={warehouseId}
          getMaterialList={getMaterialList}
        />
      </MyModal>
      <Text
        color="#000"
        fontSize="22px !important"
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Материалы
      </Text>
      <VStack align={"flex-start"}>
        <Text
          color="#000"
          fontWeight={700}
          lineHeight="normal"
          fontStyle="normal"
        >
          Условные обозначения:
        </Text>
        <HStack>
          <CiEdit />
          <Text>редактирование материала.</Text>
        </HStack>
        <HStack>
          <CiShoppingCart />
          <Text>создать закупку материала</Text>
        </HStack>
        <HStack>
          <HiOutlineArrowsRightLeft />
          <Text>перемещение материала</Text>
        </HStack>
        <HStack>
          <MdOutlineContentCut />
          <Text>обрезка материала</Text>
        </HStack>
      </VStack>
      <Stack gap={"25px"} direction={width >= 768 ? "row" : "column"}>
        <div style={{ width: 320 }}>
          <ReactSearchAutocomplete
            items={materialList}
            formatResult={formatResult}
            onSearch={handleOnSearch}
            placeholder="Начните вводить название..."
            styling={{ zIndex: 1, borderRadius: 0 }}
          />
        </div>
        <Checkbox
          isChecked={showHidden}
          onChange={(e) => setShowHidden(e.target.checked)}
        >
          Показывать скрытые материалы
        </Checkbox>
        {warehouseId !== null && warehouseId !== -1 ? (
          <Button
            variant="menu_yellow"
            fontSize={["14px", "14px", "16px", "16px", "16px"]}
            onClick={() => setVisibleMaterialsToWarehouse(true)}
          >
            Переместить на другой склад
          </Button>
        ) : (
          ""
        )}
      </Stack>

      <Stack color={"black"} width="100%" direction={"row"} align="flex-start">
        <Stack
          color={"black"}
          spacing="25px"
          direction={width >= 935 ? "row" : "column"}
        >
          {cookie.role === roles.ADMIN ||
          cookie.role === roles.WAREHOUSE_RESPONSIBLE ? (
            <Tooltip
              label="Прежде чем создать материал, убедитесь, что у вас есть все необходимые данные: тмц, тип тмц, свойства и способы обработки."
              aria-label="Подсказка"
              placement="top"
            >
              <Button
                variant="menu_yellow"
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                onClick={() => setVisibleCreateModal(true)}
              >
                Добавить новый
              </Button>
            </Tooltip>
          ) : (
            ""
          )}
          <HStack>
            <VStack>
              <Select
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                defaultValue={{ value: null, label: "Все склады" }}
                options={warehouseList}
                onChange={(e) => {
                  setWarehouseId(e.value);
                }}
                placeholder="Склады"
              ></Select>
            </VStack>
            <VStack>
              <Select
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                options={optionLengthList}
                onChange={(e) => {
                  setMeasure((prevState) => ({
                    ...prevState,
                    length: e.value,
                  }));
                }}
                placeholder="Длины"
              ></Select>
            </VStack>
            <VStack>
              <Select
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                options={optionAreaList}
                onChange={(e) => {
                  setMeasure((prevState) => ({
                    ...prevState,
                    area: e.value,
                  }));
                }}
                placeholder="Площади"
              ></Select>
            </VStack>
            <VStack>
              <Select
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                options={optionLiquidList}
                onChange={(e) => {
                  setMeasure((prevState) => ({
                    ...prevState,
                    liquid: e.value,
                  }));
                }}
                placeholder="Обьемы"
              ></Select>
            </VStack>
            <VStack>
              <Select
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                options={optionDensityList}
                onChange={(e) => {
                  setMeasure((prevState) => ({
                    ...prevState,
                    density: e.value,
                  }));
                }}
                placeholder="Плотности"
              ></Select>
            </VStack>
          </HStack>
        </Stack>
      </Stack>
      {materialListError ? (
        <div>{materialListError}</div>
      ) : (
        <TableMaterials
          measure={measure}
          totalCountMaterials={totalCountMaterials}
          currentPageSize={currentPageSize}
          setCurrentPageSize={setCurrentPageSize}
          totalPages={totalPages}
          materialList={materialList}
          getMaterialList={getMaterialList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          warehouseId={warehouseId}
        />
      )}
    </VStack>
  );
};
export default MaterialsPage;
