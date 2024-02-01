import React, { useEffect, useState } from "react";
import { FormikProvider, useFormik, FieldArray } from "formik";
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
import CustomInput from "../../staff_form";
import CustomSelect from "../../custom_select";
import { Heading, IconButton, Stack } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

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
  staff: Yup.array()
    .of(
      Yup.object().shape({
        position: Yup.string().required("Обязательное поле"),
        email: Yup.string()
          .email("Неверный формат почты")
          .required("Обязательное поле"),
        phone: Yup.string()
          .matches(/^\+?\d{10,12}$/, "Неверный формат телефона")
          .required("Обязательное поле"),
        fio: Yup.string().required("Обязательное поле"),
      })
    )
    .min(1, "Добавьте хотя бы одного работника"),
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
    website: "",
    address: "",
    email: "",
    phone: "",
    staff: [{ position: "", email: "", phone: "", fio: "" }],
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
      setSupplier(response.data);
    } catch (error) {
      console.error("Error get supplier:", error);
    }
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
    console.log(supplier);
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
            <FieldArray name="staff">
              {({ push, remove }) => (
                <Stack spacing={4}>
                  {formik.values.staff.map((worker, index) => (
                    <Box
                      key={index}
                      p={4}
                      border="1px"
                      borderColor="gray.200"
                      rounded="md"
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <Heading size="sm">Работник #{index + 1}</Heading>
                        {formik.values.staff.length > 1 && (
                          <IconButton
                            aria-label="Удалить работника"
                            icon={<CloseIcon />}
                            onClick={() => remove(index)}
                          />
                        )}
                      </Flex>
                      <Stack spacing={4}>
                        <CustomInput
                          name={`staff.${index}.position`}
                          label="Должность"
                          placeholder="Введите должность"
                        />
                        <CustomInput
                          name={`staff.${index}.email`}
                          label="Почта"
                          placeholder="Введите почту"
                          type="email"
                        />
                        <CustomInput
                          name={`staff.${index}.phone`}
                          label="Телефон"
                          placeholder="Введите телефон"
                          type="tel"
                        />
                        <CustomInput
                          name={`staff.${index}.fio`}
                          label="ФИО"
                          placeholder="Введите ФИО"
                        />
                      </Stack>
                    </Box>
                  ))}
                  <Button
                    leftIcon={<AddIcon />}
                    variant="menu_yellow"
                    onClick={() =>
                      push({ position: "", email: "", phone: "", fio: "" })
                    }
                  >
                    Добавить работника
                  </Button>
                </Stack>
              )}
            </FieldArray>
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
