import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import SupplierService from "../../../API/services/supplier_service";
import DeliveryMethodService from "../../../API/services/deliveryMethod_service";
import PurchaseService from "../../../API/services/purchase_service";
import FormikInput from "../../UI/formik_input";
import FormikSelect from "../../UI/formik_select";
import { getDate } from "../../../helperFunc/getDate";
import { AsyncPaginate } from "react-select-async-paginate";

const validationSchema = Yup.object().shape({
  dateTime: Yup.date().min(getDate()).required("Required"),
  linkToMaterial: Yup.string()
    .nullable()
    .min(1, "Too Short!")
    .max(255, "Too Long!"),
  articleNumber: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  count: Yup.number()
    .min(1, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .test("is-decimal", "invalid decimal", (value) =>
      (value + "").match(/^(\d*\.{0,1}\d{0,2}$)/),
    )
    .required("Required"),
  supplierId: Yup.number().min(1, "Too Short!").required("Required"),
  deliveryMethodId: Yup.number().min(1, "Too Short!").required("Required"),
  materialId: Yup.number().min(1, "Too Short!").required("Required"),
});

const PurchaseCreateForm = ({ visibleModal, setVisibleModal, materialId }) => {
  const purchase = {
    dateTime: new Date(),
    linkToMaterial: "",
    articleNumber: "",
    count: "",
    price: "",
    supplierId: "",
    deliveryMethodId: "",
    materialId: materialId,
  };

  const [deliveryMethodList, setDeliveryMethodList] = useState([]);
  const selectRefSupplierId = useRef();
  const selectRefDeliveryMethodId = useRef();

  const getDeliveryMethods = async () => {
    try {
      await DeliveryMethodService.getDeliveryMethods().then((response) => {
        setDeliveryMethodList(
          response.data.map((deliveryMethod) => {
            return { value: deliveryMethod.id, label: deliveryMethod.name };
          }),
        );
      });
    } catch (error) {
      console.error("Error getSuppliers:", error);
    }
  };

  const onClose = () => {
    setVisibleModal(false);
    clearForm();
  };

  const createPurchase = async (purchase) => {
    try {
      await PurchaseService.createPurchase(purchase);
    } catch (error) {
      console.error("Error createPurchase:", error);
    }
  };

  const changePrice = (e) => {
    let value = e.target.value;
    const validated = value.match(/^(\d*\.{0,1}\d{0,2}$)/);
    if (validated && value[0] !== "0") {
      formik.handleChange(e);
    }
  };

  const formik = useFormik({
    initialValues: purchase,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      values.dateTime = new Date();
      createPurchase(values);
      onClose();
      setSubmitting(false);
    },
  });
  const getSuppliers = async (currentPage, currentPageSize, search) => {
    try {
      return await SupplierService.getSuppliersClients(
        currentPage,
        currentPageSize,
        search,
      );
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const loadOptionsSupplier = async (search, prevOptions, { page }) => {
    const response = await getSuppliers(page, 10, search);

    const hasMore = prevOptions.length < response.data.totalItems;
    return {
      options: response.data.suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      })),
      hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  useEffect(() => {
    if (materialId > 0) {
      selectRefSupplierId.current.setValue("");
      selectRefDeliveryMethodId.current.setValue("");
      formik.setValues({ ...purchase, materialId: materialId });
      formik.setErrors({});
      formik.setTouched({});
    }
  }, [materialId]);

  useEffect(() => {
    if (materialId > 0 && visibleModal) {
      getDeliveryMethods();
    }
  }, [visibleModal]);

  const clearForm = () => {
    selectRefSupplierId.current.setValue("");
    selectRefDeliveryMethodId.current.setValue("");
    formik.setValues({ ...purchase, materialId: materialId });
    formik.setErrors({});
    formik.setTouched({});
  };

  return (
    <FormikProvider value={formik}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        fontWeight="bold"
        mb={9}
      >
        <Text fontSize="2xl">Создание закупки</Text>
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
            <FormikInput
              formik={formik}
              name={"linkToMaterial"}
              label={"Ссылка на материал"}
            />
            <FormikInput
              formik={formik}
              name={"articleNumber"}
              label={"Номер изделия"}
            />
            <FormikInput formik={formik} name={"count"} label={"Кол-во"} />
            <FormikInput
              formik={formik}
              name={"price"}
              label={"Цена"}
              change={changePrice}
            />
            <div>
              <label>{"Поставщик"}</label>
              <AsyncPaginate
                selectRef={selectRefSupplierId}
                loadOptions={loadOptionsSupplier}
                onChange={(e) => formik.setFieldValue("supplierId", e.value)}
                additional={{
                  page: 1,
                }}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                placeholder={"Поставщик"}
              />
            </div>
            <FormikSelect
              selectRef={selectRefDeliveryMethodId}
              formik={formik}
              name={"deliveryMethodId"}
              placeholder={"Метод доставки"}
              options={deliveryMethodList}
            />
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

export default PurchaseCreateForm;
