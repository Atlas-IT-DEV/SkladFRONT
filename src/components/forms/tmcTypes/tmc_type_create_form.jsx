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
import TmcTypeService from "../../../API/services/tmcType_service";
import FormikInput from "../../UI/formik_input";
import { Select } from "chakra-react-select";
import PropertyService from "../../../API/services/property_service";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  propertyIdList: Yup.array(
    Yup.number().min(1, "Too Short!").required("Required"),
  ).max(20, "Too Long!"),
});

const TmcTypeCreateForm = ({ getTmcTypeList, setVisibleModal }) => {
  const [tmcType, setTmcType] = useState({
    name: "",
    propertyIdList: [],
  });

  const [propertyList, setPropertyList] = useState([]);

  const getProperties = async () => {
    try {
      const response = await PropertyService.getProperties();
      setPropertyList(
        response.data.map((property) => {
          return {
            value: property.id,
            label: property.name,
          };
        }),
      );
    } catch (error) {
      console.error("Error getProperties:", error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const onClose = () => {
    setVisibleModal(false);
  };

  const createTmcType = async (propety) => {
    try {
      await TmcTypeService.createTmcType(propety);
      getTmcTypeList();
    } catch (error) {
      console.error("Error createTmcType:", error);
    }
  };

  const formik = useFormik({
    initialValues: tmcType,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      createTmcType(values);
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
        <Text fontSize="2xl">Создание типа ТМЦ</Text>
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
            <Select
              isMulti
              closeMenuOnSelect={false}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
              isInvalid={
                formik.errors.propertyIdList && formik.touched.propertyIdList
              }
              errorBorderColor="crimson"
              options={propertyList}
              onChange={(e) => {
                formik.setFieldValue(
                  "propertyIdList",
                  e.map((property) => property.value),
                );
              }}
              placeholder={"Свойства"}
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

export default TmcTypeCreateForm;
