import React, { useEffect, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FormikInput from "../../UI/formik_input";
import DeliveryMethodService from "../../../API/services/deliveryMethod_service";
import SupplierService from "../../../API/services/supplier_service";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  brand: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  supplierType: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  website: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  psch: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  kpp: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  ksch: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  bic: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  client: Yup.boolean().required("Required"),
  inn: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
});

const SupplierEditForm = ({
  getSuppliersList,
  setVisibleModal,
  supplierId,
}) => {
  const [supplier, setSupplier] = useState({
    name: "",
    brand: "",
    supplierType: "LEGAL_ENTITY",
    staff: [],
    website: "",
    address: "",
    email: "",
    phone: "",
    deliveryPlaceIdList: [1],
    psch: "",
    kpp: "",
    ksch: "",
    bic: "",
    client: true,
    inn: "",
  });
  const getSupplier = async (supplierId) => {
    try {
      const response = await SupplierService.getSupplierById(supplierId);
      setSupplier(response);
    } catch (error) {
      console.error("Error get supplier:", error);
    }
  };

  const supplierNew = {
    name: "",
    brand: "",
    supplierType: "LEGAL_ENTITY",
    staff: [],
    website: "",
    address: "",
    email: "",
    phone: "",
    deliveryPlaceIdList: [1],
    psch: "",
    kpp: "",
    ksch: "",
    bic: "",
    client: true,
    inn: "",
  };

  const onClose = () => {
    setVisibleModal(false);
    clearForm();
  };

  const createSupplier = async (supplier) => {
    try {
      await SupplierService.createSupplier(supplier);
      getSuppliersList();
    } catch (error) {
      console.error("Error create supplier:", error);
    }
  };
  useEffect(() => {
    getSupplier(supplierId);
  }, [supplierId]);

  const formik = useFormik({
    initialValues: supplier,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      createSupplier(values);
      onClose();
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const clearForm = () => {
    formik.setValues(supplier);
    formik.setErrors({});
    formik.setTouched({});
  };
  useEffect(() => {
    formik.setValues(supplier);
  }, [supplier]);

  return (
    <FormikProvider value={formik}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        fontWeight="bold"
        mb={9}
      >
        <Text fontSize="2xl">Информация о поставщике</Text>
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
            <FormikInput formik={formik} name={"name"} label={"Название"} />
            <FormikInput formik={formik} name={"brand"} label={"Бренд"} />
            <FormikInput
              formik={formik}
              name={"supplierType"}
              label={"Тип поставщика"}
            />
            <FormikInput
              formik={formik}
              name={"website"}
              label={"Ссылка на сайт"}
            />
            <FormikInput formik={formik} name={"address"} label={"Адрес"} />
            <FormikInput formik={formik} name={"email"} label={"Почта"} />
            <FormikInput formik={formik} name={"phone"} label={"Телефон"} />
            <FormikInput formik={formik} name={"psch"} label={"ПСКХ"} />
            <FormikInput formik={formik} name={"kpp"} label={"КПП"} />
            <FormikInput formik={formik} name={"ksch"} label={"КСКХ"} />
            <FormikInput formik={formik} name={"bic"} label={"БИК"} />
            <FormikInput formik={formik} name={"inn"} label={"ИНН"} />
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

export default SupplierEditForm;
