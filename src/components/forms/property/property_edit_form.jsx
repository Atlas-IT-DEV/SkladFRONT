import React, { useEffect, useRef, useState } from "react";
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
import PropertyService from "../../../API/services/property_service";
import FormikSelect from "../../UI/formik_select";
import { optionTypeList } from "./optionTypeList";
import FormikInput from "../../UI/formik_input";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  type: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
});

const PropertyEditForm = ({ getPropertyList, setVisibleModal, propertyId }) => {
  const [property, setProperty] = useState({
    name: "",
    type: "",
  });

  const selectTypesRef = useRef();
  const getProperty = async (propertyId) => {
    try {
      const response = await PropertyService.getProperty(propertyId);
      selectTypesRef.current?.setValue(
        optionTypeList.find((option) => {
          return option.value === response.data.type;
        }),
      );
      setProperty(response.data);
    } catch (error) {
      console.error("Error getProperty:", error);
    }
  };

  useEffect(() => {
    if (propertyId > 0) {
      getProperty(propertyId);
    }
  }, [propertyId]);

  const onClose = () => {
    setVisibleModal(false);
  };

  const editProperty = async (propety) => {
    try {
      await PropertyService.updateProperty(propertyId, propety);
      getPropertyList();
    } catch (error) {
      console.error("Error createProperty:", error);
    }
  };

  const formik = useFormik({
    initialValues: property,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      editProperty(values);
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
        <Text fontSize="2xl">Редактирование свойства</Text>
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
            <FormikSelect
              selectRef={selectTypesRef}
              formik={formik}
              name={"type"}
              label={"Тип"}
              options={optionTypeList}
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

export default PropertyEditForm;
