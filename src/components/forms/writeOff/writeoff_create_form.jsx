import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import FormikInput from "../../UI/formik_input";
import FormikSelect from "../../UI/formik_select";
import WarehouseService from "../../../API/services/warehouse_service";
import MaterialService from "../../../API/services/material_service";
import SupplierService from "../../../API/services/supplier_service";
import { Select } from "chakra-react-select";
import WriteOffService from "../../../API/services/writeoff_service";

const validationSchema = Yup.object().shape({
  reason: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  supplierId: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  materials: Yup.array()
    .of(
      Yup.object().shape({
        materialId: Yup.number().min(1, "Too Short!").required("Required"),
        count: Yup.number().min(1, "Too Short!").required("Required"),
        purchaseId: Yup.number().min(1, "Too Short!").required("Required"),
      }),
    )
    .max(20, "Too Long!"),
  comment: Yup.string().nullable().min(1, "Too Short!").max(300, "Too Long!"),
  warehouseId: Yup.number().min(1, "Too Short!").required("Required"),
});

const WriteoffCreateForm = ({ getWriteOffList, setVisibleModal }) => {
  const [writeOff, setWriteOff] = useState({
    reason: "",
    supplierId: 0,
    materials: [],
    comment: "",
    warehouseId: 0,
  });

  const [warehouses, setWarehouses] = useState();
  const [warehouseMaterials, setWarehouseMaterials] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [paginationMaterial, setPaginationMaterial] = useState({
    currentPage: 1,
    currentPageSize: 6,
  });
  const [paginationSupplier, setPaginationSupplier] = useState({
    currentPage: 1,
    currentPageSize: 6,
  });
  const onClose = () => {
    setVisibleModal(false);
  };

  const getWarehouses = async () => {
    try {
      const response = await WarehouseService.getWarehouses();
      setWarehouses(
        response.data.map((warehouses) => {
          return { value: warehouses.id, label: warehouses.name };
        }),
      );
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const getMaterials = async (warehouseId, currentPage, currentPageSize) => {
    try {
      const response = await MaterialService.getMaterials(
        warehouseId,
        currentPage,
        currentPageSize,
      );
      if (response.data.materials.length > 0) {
        if (currentPage > 1) {
          setWarehouseMaterials((prevState) => [
            ...prevState,
            ...response.data.materials,
          ]);
        } else {
          setWarehouseMaterials(response.data.materials);
        }
      }
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const getSuppliers = async (currentPage, currentPageSize) => {
    try {
      const response = await SupplierService.getSuppliersClients(
        currentPage,
        currentPageSize,
      );
      setSuppliers(
        response.data.suppliers.map((supplier) => {
          return { value: supplier.id, label: supplier.name };
        }),
      );
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const getMaterial = async (materialId, warehouseId) => {
    try {
      const response = await MaterialService.getMaterial(
        materialId,
        warehouseId,
      );
      return response.data;
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const createWriteOff = async (WriteOff) => {
    try {
      WriteOff.materials = WriteOff.materials.map((material) => {
        delete material.currentPurchaseMaterials;
        delete material.materialName;
        return material;
      });
      await WriteOffService.createWriteoff(WriteOff);
      getWriteOffList();
    } catch (error) {
      console.error("Error createWriteOff:", error);
    }
  };

  const formik = useFormik({
    initialValues: writeOff,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      createWriteOff(JSON.parse(JSON.stringify(values)));
      onClose();
      setSubmitting(false);
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    getWarehouses();
    getSuppliers(
      paginationSupplier.currentPage,
      paginationSupplier.currentPageSize,
    );
  }, []);

  useEffect(() => {
    setPaginationMaterial({
      currentPage: 1,
      currentPageSize: paginationMaterial.currentPageSize,
    });
    getMaterials(
      formik.values.warehouseId,
      1,
      paginationMaterial.currentPageSize,
    );
  }, [formik.values.warehouseId]);

  useEffect(() => {
    getMaterials(
      formik.values.warehouseId,
      paginationMaterial.currentPage,
      paginationMaterial.currentPageSize,
    );
  }, [paginationMaterial.currentPage]);

  const setCurrentPageMaterials = () => {
    setPaginationMaterial((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
  };

  const [mapMaterials, setMapMaterials] = useState(new Map());

  const updateFormikMaterials = () => {
    formik.values.materials = [];
    mapMaterials.forEach((value, key, map) => {
      formik.values.materials.push({
        materialId: value.materialId,
        count: value.count,
        purchaseId: value.purchaseId,
      });
    });
    formik.setFieldValue("materials", formik.values.materials);
  };
  const addFormikMaterial = async (e) => {
    console.log(formik.values.warehouseId);
    for (const material of e) {
      if (!mapMaterials.has(material.value)) {
        const newMaterial = await getMaterial(
          material.value,
          formik.values.warehouseId,
        );
        const currentPurchaseMaterials =
          newMaterial?.currentPurchaseMaterials?.map((purchaseMaterial) => ({
            purchaseId: purchaseMaterial.purchaseId,
            countOnWarehouse: purchaseMaterial.countOnWarehouse,
          }));
        mapMaterials.set(material.value, {
          currentPurchaseMaterials,
          materialName: material.label,
          materialId: material.value,
          count: 0,
          purchaseId: 0,
        });
      }
    }
    mapMaterials.forEach((value, key, map) => {
      if (!e.find((material) => material.value === key)) {
        mapMaterials.delete(key);
      }
    });
    setMapMaterials(mapMaterials);
    updateFormikMaterials();
  };

  const setCountFormikMaterial = async (e, materialId) => {
    let value = e.target.value;
    const validated = value.match(/^(\d*$)/);
    if (validated && value[0] !== "0") {
      const material = mapMaterials.get(materialId);
      const currentPurchaseMaterial = material.currentPurchaseMaterials.find(
        (purchaseMaterial) =>
          purchaseMaterial.purchaseId === material.purchaseId,
      );
      if (currentPurchaseMaterial.countOnWarehouse >= value) {
        material.count = value;
        mapMaterials.set(materialId, material);
        setMapMaterials(mapMaterials);
        updateFormikMaterials();
      }
    }
  };
  const setPurchaseFormikMaterial = async (e, materialId) => {
    const material = mapMaterials.get(materialId);
    material.purchaseId = e.value;
    const currentPurchaseMaterial = material.currentPurchaseMaterials.find(
      (purchaseMaterial) => purchaseMaterial.purchaseId === material.purchaseId,
    );
    if (currentPurchaseMaterial.countOnWarehouse >= material.count) {
      mapMaterials.set(materialId, material);
      setMapMaterials(mapMaterials);
      updateFormikMaterials();
    } else {
      formik.setFieldError(
        "materials",
        "Такого количества нет по одному из заказов",
      );
    }
  };
  console.log(formik.errors);
  return (
    <FormikProvider value={formik}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        fontWeight="bold"
        mb={9}
      >
        <Text fontSize="2xl">Списание</Text>
        <CloseButton onClick={onClose} />
      </Flex>
      <Box pb={6}>
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid
            maxH="500px"
            width={["300px", "350px", "400px", "450px", "500px"]}
            overflowX="scroll"
            spacing={5}
            p={1}
            sx={{
              "::-webkit-scrollbar": {
                w: "2",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10",
                bg: `gray.100`,
              },
            }}
          >
            <FormikInput formik={formik} name={"reason"} label={"Причина"} />
            <FormikSelect
              formik={formik}
              name={"supplierId"}
              label={"Поставщик"}
              options={suppliers}
            />
            <FormikInput
              formik={formik}
              name={"comment"}
              label={"Комментарий"}
            />
            <FormikSelect
              formik={formik}
              name={"warehouseId"}
              label={"Склад"}
              options={warehouses}
            />
            <div>
              <label>{"Материалы"}</label>
              <Select
                isMulti
                onMenuScrollToBottom={(event) => setCurrentPageMaterials(event)}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                isInvalid={
                  formik.errors["materials"] && formik.touched["materials"]
                }
                onChange={addFormikMaterial}
                errorBorderColor="crimson"
                options={warehouseMaterials?.map((material) => ({
                  value: material.id,
                  label: material.name,
                }))}
                placeholder={"Материалы"}
              ></Select>
            </div>
            {formik.values.materials?.map((material) => {
              const materialFromMap = mapMaterials.get(material.materialId);
              return (
                <div key={material.materialId}>
                  <label>{materialFromMap?.materialName}</label>
                  <Select
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 3 }),
                    }}
                    onChange={(e) =>
                      setPurchaseFormikMaterial(e, material.materialId)
                    }
                    errorBorderColor="crimson"
                    options={materialFromMap.currentPurchaseMaterials?.map(
                      (purchaseMaterial) => ({
                        value: purchaseMaterial.purchaseId,
                        label: `id: ${purchaseMaterial.purchaseId}, Количество: ${purchaseMaterial.countOnWarehouse}`,
                      }),
                    )}
                    placeholder={materialFromMap?.materialName}
                  ></Select>
                  <Input
                    marginTop={5}
                    value={materialFromMap.count}
                    onChange={(e) =>
                      setCountFormikMaterial(e, material.materialId)
                    }
                    height="40px"
                    placeholder={materialFromMap?.materialName}
                  />
                </div>
              );
            })}
          </SimpleGrid>
          <Flex justifyContent="flex-end">
            <Button
              variant="menu_red"
              onClick={onClose}
              mr={3}
              maxWidth="100%"
              fontSize={["14px", "14px", "16px", "16px", "16px"]}
            >
              Отмена
            </Button>
            <Button
              variant="menu_yellow"
              type="submit"
              me={1}
              maxWidth="100%"
              fontSize={["14px", "14px", "16px", "16px", "16px"]}
            >
              Сохранить
            </Button>
          </Flex>
        </form>
      </Box>
    </FormikProvider>
  );
};
export default WriteoffCreateForm;
