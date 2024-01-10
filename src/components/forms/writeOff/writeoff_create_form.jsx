import React, { useEffect, useRef, useState } from "react";
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
import { useCookies } from "react-cookie";

const validationSchema = Yup.object().shape({
  reason: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  supplierId: Yup.number().min(1, "Too Short!").required("Required"),
  materials: Yup.array()
    .of(
      Yup.object().shape({
        materialId: Yup.number().min(1, "Too Short!").required("Required"),
        materialPurchases: Yup.array()
          .of(
            Yup.object().shape({
              count: Yup.number().min(1, "Too Short!").required("Required"),
              purchaseId: Yup.number()
                .min(1, "Too Short!")
                .required("Required"),
            }),
          )
          .max(20, "Too Long!"),
      }),
    )
    .max(20, "Too Long!"),
  warehouseId: Yup.number().min(1, "Too Short!").required("Required"),
});

const WriteoffCreateForm = ({ getWriteOffList, setVisibleModal }) => {
  const [cookie, setCookie] = useCookies();
  const [writeOff, setWriteOff] = useState({
    reason: "",
    supplierId: 0,
    materials: [],
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
      const materials = [];
      WriteOff.materials.forEach((material) => {
        material.materialPurchases.forEach((materialPurchase) => {
          materials.push({
            materialId: material.materialId,
            count: materialPurchase.count,
            purchaseId: materialPurchase.purchaseId,
          });
        });
      });
      WriteOff.materials = materials;
      if (cookie.warehouseId > 0) {
        delete WriteOff.warehouseId;
      }
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
    if (cookie.warehouseId > 0) {
      getMaterials(cookie.warehouseId, 1, paginationMaterial.currentPageSize);
    }
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

  const findIndexMaterial = (materialId) => {
    return formik.values.materials.findIndex(
      (formikMaterial) => formikMaterial.materialId === materialId,
    );
  };
  const selectMaterialRef = useRef();
  const setWarehouseId = (e) => {
    selectMaterialRef.current?.setValue([]);
    formik.setFieldValue("warehouseId", e.value);
    formik.setFieldValue("materials", []);
  };
  const addFormikMaterial = async (e) => {
    for (const material of e) {
      if (findIndexMaterial(material.value) === -1) {
        const newMaterial = await getMaterial(
          material.value,
          formik.values.warehouseId,
        );
        const currentPurchaseMaterials =
          newMaterial?.currentPurchaseMaterials?.map((purchaseMaterial) => ({
            purchaseId: purchaseMaterial.purchaseId,
            countOnWarehouse: purchaseMaterial.countOnWarehouse,
          }));
        const materialPurchases =
          currentPurchaseMaterials.length === 1
            ? [
                {
                  count: 0,
                  purchaseId: currentPurchaseMaterials[0].purchaseId,
                },
              ]
            : [];
        formik.values.materials.push({
          currentPurchaseMaterials,
          materialName: material.label,
          materialId: material.value,
          materialPurchases,
        });
      }
    }
    formik.values.materials.forEach((materialFormik, index) => {
      if (!e.find((material) => material.value === materialFormik.materialId)) {
        formik.values.materials.splice(index, 1);
      }
    });
    formik.setFieldValue("materials", formik.values.materials);
  };

  const setCountFormikMaterial = async (e, materialId, purchaseId) => {
    let value = e.target.value;
    const validated = value.match(/^(\d*$)/);
    if (validated && value[0] !== "0") {
      const indexMaterial = findIndexMaterial(materialId);
      const material = formik.values.materials[indexMaterial];
      const currentPurchaseMaterial = material.currentPurchaseMaterials.find(
        (purchaseMaterial) => purchaseMaterial.purchaseId === purchaseId,
      );
      if (currentPurchaseMaterial.countOnWarehouse >= value) {
        const indexMaterialPurchase = formik.values.materials[
          indexMaterial
        ].materialPurchases.findIndex(
          (materialPurchase) => materialPurchase.purchaseId === purchaseId,
        );
        formik.values.materials[indexMaterial].materialPurchases[
          indexMaterialPurchase
        ].count = value;
        formik.setFieldValue("materials", formik.values.materials);
      }
    }
  };
  const setPurchaseFormikMaterial = async (e, materialId) => {
    const indexMaterial = findIndexMaterial(materialId);
    const material = formik.values.materials[indexMaterial];
    const array = [];

    e.forEach((eventMaterialPurchase) => {
      let indexMaterialPurchase = material.materialPurchases.findIndex(
        (materialPurchase) =>
          materialPurchase.purchaseId === eventMaterialPurchase.value,
      );

      if (indexMaterialPurchase !== -1) {
        array.push(material.materialPurchases[indexMaterialPurchase]);
      } else {
        array.push({
          count: 0,
          purchaseId: eventMaterialPurchase.value,
        });
      }
    });
    array.forEach((materialPurchase) => {
      const currentPurchaseMaterial = material.currentPurchaseMaterials.find(
        (purchaseMaterial) =>
          purchaseMaterial.purchaseId === materialPurchase.purchaseId,
      );
      if (
        !(currentPurchaseMaterial.countOnWarehouse >= materialPurchase.count)
      ) {
        formik.setFieldError(
          "materials",
          "Такого количества нет по одному из заказов",
        );
      }
    });
    formik.values.materials[indexMaterial].materialPurchases = array;
    formik.setFieldValue("materials", formik.values.materials);
  };

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
            {cookie.warehouseId > 0 ? (
              ""
            ) : (
              <div>
                <label>{"Склад"}</label>
                <Select
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                  isInvalid={
                    formik.errors["warehouseId"] &&
                    formik.touched["warehouseId"]
                  }
                  errorBorderColor="crimson"
                  options={warehouses}
                  onChange={setWarehouseId}
                  placeholder={"Склад"}
                ></Select>
              </div>
            )}
            <div>
              <label>{"Материалы"}</label>
              <Select
                ref={selectMaterialRef}
                isMulti
                closeMenuOnSelect={false}
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
              return (
                <div key={material.materialId}>
                  <label>{material?.materialName}</label>
                  {material.currentPurchaseMaterials.length === 1 ? (
                    <Select
                      defaultValue={{
                        value: material.materialPurchases[0].purchaseId,
                        label: `id: ${material.materialPurchases[0].purchaseId}, Количество: ${material.currentPurchaseMaterials[0].countOnWarehouse}`,
                      }}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 3 }),
                      }}
                      errorBorderColor="crimson"
                      placeholder={material?.materialName}
                    ></Select>
                  ) : (
                    <Select
                      isMulti
                      closeMenuOnSelect={false}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 3 }),
                      }}
                      onChange={(e) =>
                        setPurchaseFormikMaterial(e, material.materialId)
                      }
                      errorBorderColor="crimson"
                      options={material.currentPurchaseMaterials?.map(
                        (purchaseMaterial) => ({
                          value: purchaseMaterial.purchaseId,
                          label: `id: ${purchaseMaterial.purchaseId}, Количество: ${purchaseMaterial.countOnWarehouse}`,
                        }),
                      )}
                      placeholder={material?.materialName}
                    ></Select>
                  )}

                  {material.materialPurchases?.map((materialPurchase) => {
                    return (
                      <div
                        style={{ marginTop: "1.25rem" }}
                        key={`${material.materialId}-${materialPurchase.purchaseId}`}
                      >
                        <label>{`id: ${
                          materialPurchase.purchaseId
                        }, Количество: ${
                          material.currentPurchaseMaterials.find(
                            (purchaseMaterial) =>
                              purchaseMaterial.purchaseId ===
                              materialPurchase.purchaseId,
                          ).countOnWarehouse
                        }`}</label>
                        <Input
                          value={materialPurchase.count}
                          onChange={(e) =>
                            setCountFormikMaterial(
                              e,
                              material.materialId,
                              materialPurchase.purchaseId,
                            )
                          }
                          height="40px"
                          placeholder={material?.materialName}
                        />
                      </div>
                    );
                  })}
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
