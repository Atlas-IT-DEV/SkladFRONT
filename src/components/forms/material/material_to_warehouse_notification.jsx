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
import { Select } from "chakra-react-select";
import WarehouseService from "../../../API/services/warehouse_service";
import MaterialService from "../../../API/services/material_service";
import PurchaseService from "../../../API/services/purchase_service";
import MaterialFormTransferDto from "../../../dto/material_form_transfer_dto";
import NotificationService from "../../../API/services/notification_service";
import WarehouseToWarehouseDto from "../../../dto/warehouse_to_warehouse_dto";

const validationSchema = Yup.object().shape({
  warehouseId: Yup.number().min(1, "Too Short!").required("Required"),
  materialId: Yup.number().min(1, "Too Short!").required("Required"),
  purchaseId: Yup.number().min(1, "Too Short!").required("Required"),
  maxCount: Yup.number()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  count: Yup.number()
    .when("maxCount", (maxCount, schema) => {
      return maxCount
        ? schema
            .min(1, "Too Short!")
            .max(maxCount, `Count cannot be greater than ${maxCount}`)
        : schema.nullable().transform((value, originalValue) => {
            if (
              originalValue === undefined ||
              originalValue === null ||
              originalValue === ""
            ) {
              return null; // Count field must be empty when maxCount is not present
            }
            return value;
          });
    })
    .required("Required"),
});
const MaterialToWarehouseNotification = ({
  visibleModal,
  setVisibleModal,
  materialId,
  getMaterialList,
}) => {
  const materialTransfer = new MaterialFormTransferDto({ materialId });

  const formik = useFormik({
    initialValues: materialTransfer,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      Transfer(values);
      setSubmitting(false);
      onClose();
    },
  });

  const [purchaseList, setPurchaseList] = useState([]);

  const [warehouseList, setWarehouseList] = useState([]);

  const selectWarehouseIdRef = useRef();

  const selectPurchaseIdRef = useRef();

  const onClose = () => {
    setVisibleModal(false);
  };

  const changeCount = (e) => {
    let value = e.target.value;
    const validated = value.match(/^(\d*$)/);
    if (validated && value[0] !== "0") {
      formik.handleChange(e);
    }
  };

  const getMaterial = async (materialId) => {
    try {
      const response = await MaterialService.getMaterial(materialId);
      const newPurchaseList = await Promise.all(
        response.data.currentPurchaseMaterials.map(async (purchaseMaterial) => {
          const purchase = await PurchaseService.getPurchase(
            purchaseMaterial.purchaseId,
          );
          return {
            value: purchaseMaterial.purchaseId,
            maxCount: purchaseMaterial.unallocatedCount,
            label: `${purchase.data.price} ${purchaseMaterial.unallocatedCount} ${purchase.data.supplier.name}`,
          };
        }),
      );
      setPurchaseList(newPurchaseList);
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const getWarehouses = async () => {
    try {
      await WarehouseService.getWarehouses().then((response) => {
        setWarehouseList(
          response.data.map((warehouse) => {
            return { value: warehouse.id, label: warehouse.name };
          }),
        );
      });
    } catch (error) {
      console.error("Error getWarehouses:", error);
    }
  };

  useEffect(() => {
    if (visibleModal) {
      formik.setValues(new MaterialFormTransferDto(materialId));
      formik.setTouched({});
      selectPurchaseIdRef.current?.setValue();
      selectWarehouseIdRef.current?.setValue();
      getWarehouses();
      getMaterial(materialId);
    }
  }, [materialId, visibleModal]);

  const Transfer = async (materialTransfer) => {
    try {
      delete materialTransfer.maxCount;
      await NotificationService.createNotification(
        new WarehouseToWarehouseDto({
          currentWarehouseId: -1,
          newWarehouseId: materialTransfer.warehouseId,
          materialId: materialTransfer.materialId,
          purchaseId: materialTransfer.purchaseId,
          count: materialTransfer.count,
        }),
      );
      getMaterialList();
    } catch (error) {
      console.error("Error getSuppliers:", error);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        fontWeight="bold"
        mb={9}
      >
        <Text fontSize="2xl">Перемещение на склад</Text>
        <CloseButton onClick={onClose} />
      </Flex>
      <Box pb={6}>
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid
            maxH="500px"
            width="500px"
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
            <div>
              <label>{"Количество"}</label>
              <Input
                isInvalid={formik.errors.count && formik.touched.count}
                errorBorderColor="crimson"
                id="count"
                name="count"
                value={formik.values.count}
                onChange={changeCount}
                height="40px"
                placeholder={"Количество"}
              />
            </div>
            <label>{"Закупки"}</label>
            <Select
              ref={selectPurchaseIdRef}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
              isInvalid={
                (formik.errors.purchaseId && formik.touched.purchaseId) ||
                (formik.errors.maxCount && formik.touched.maxCount)
              }
              errorBorderColor="crimson"
              options={purchaseList}
              onChange={(e) => {
                formik.setFieldValue("purchaseId", e?.value);
                formik.setFieldValue("maxCount", e?.maxCount);
              }}
              placeholder={"Закупки"}
            ></Select>
            <Select
              ref={selectWarehouseIdRef}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
              isInvalid={
                formik.errors.warehouseId && formik.touched.warehouseId
              }
              errorBorderColor="crimson"
              options={warehouseList}
              id="warehouseId"
              name="warehouseId"
              onChange={(e) => {
                formik.setFieldValue("warehouseId", e?.value);
              }}
              placeholder={"Склад"}
            ></Select>
          </SimpleGrid>
          <Flex justifyContent="flex-end">
            <Button variant="menu_red" onClick={onClose} mr={3}>
              Отмена
            </Button>
            <Button variant="menu_yellow" type="submit" me={1}>
              Сохранить
            </Button>
          </Flex>
        </form>
      </Box>
    </FormikProvider>
  );
};

export default MaterialToWarehouseNotification;
