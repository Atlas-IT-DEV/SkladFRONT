import React, { useEffect, useState } from "react";
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

const PurchaseCreateForm = ({ setVisibleModal, materialId }) => {
  const [purchase, setPurchase] = useState({
    dateTime: new Date(),
    linkToMaterial: "",
    articleNumber: "",
    count: "",
    price: "",
    supplierId: "",
    deliveryMethodId: "",
    materialId: materialId,
  });

  const [supplierList, setSupplierList] = useState([]);
  const [deliveryMethodList, setDeliveryMethodList] = useState([]);

  const getSuppliers = async () => {
    try {
      await SupplierService.getSuppliers().then((response) => {
        setSupplierList(
          response.data.suppliers.map((supplier) => {
            return { value: supplier.id, label: supplier.name };
          }),
        );
      });
    } catch (error) {
      console.error("Error getSuppliers:", error);
    }
  };

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
  };

  useEffect(() => {
    getSuppliers();
    getDeliveryMethods();
  }, []);

  useEffect(() => {
    setPurchase({ ...purchase, materialId: materialId });
  }, [materialId]);

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
    enableReinitialize: true,
  });
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
            <FormikInput formik={formik} name={"count"} label={"Количество"} />
            <FormikInput
              formik={formik}
              name={"price"}
              label={"Цена"}
              change={changePrice}
            />
            <FormikSelect
              formik={formik}
              name={"supplierId"}
              placeholder={"Поставщик"}
              options={supplierList}
            />
            <FormikSelect
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
