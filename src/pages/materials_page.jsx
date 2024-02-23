import {
  Button,
  Checkbox,
  HStack,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
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

const MaterialsPage = () => {
  const [cookie, setCookie] = useCookies();

  const [visibleCreateModal, setVisibleCreateModal] = useState();

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
    if (searchStr != "") {
      setCurrentPage(1);
    }
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
  }, [warehouseId, currentPage, currentPageSize, searchStr, showHidden]);

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
  };
  const handleOnSelect = (item) => {
    console.log(item);
    // async () => {
    //   await MaterialService.getMaterials(
    //     warehouseId,
    //     currentPage,
    //     currentPageSize,

    //   ).then((response) => {
    //     setMaterialList(response.data.materials);
    //     setTotalPages(response.data.totalPages);
    //     setTotalCountMaterials(response.data.totalItems);
    //   });
    // }
  };

  const selectRef = useRef();

  const [value, onChange] = useState();
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
            onSelect={handleOnSelect}
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
          <Tooltip
            label="Отвечает за отображение материалов в таблице согласно выбранному складу"
            aria-label="Подсказка"
            placement="top"
          >
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
                  placeholder="Единицы измерения для длины"
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
                  placeholder="Единицы измерения для площади"
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
                  placeholder="Единицы измерения для жидксоти"
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
                  placeholder="Единицы измерения для плотности"
                ></Select>
              </VStack>
            </HStack>
          </Tooltip>
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
