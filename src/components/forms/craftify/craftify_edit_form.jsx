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
import CraftifyService from "../../../API/services/craftify_service";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
});

const CraftifyEditForm = ({ getCraftifyList, setVisibleModal, craftifyId }) => {
  const [craftify, setCraftify] = useState({
    name: "",
  });

  const getCraftify = async (craftifyId) => {
    try {
      const response = await CraftifyService.getCraftify(craftifyId);
      setCraftify(response.data);
    } catch (error) {
      console.error("Error getCraftify:", error);
    }
  };

  useEffect(() => {
    if (craftifyId > 0) {
      getCraftify(craftifyId);
    }
  }, [craftifyId]);

  const onClose = () => {
    setVisibleModal(false);
  };

  const editCraftify = async (craftify) => {
    try {
      await CraftifyService.updateCraftify(craftifyId, craftify);
      getCraftifyList();
    } catch (error) {
      console.error("Error editCraftify:", error);
    }
  };

  const formik = useFormik({
    initialValues: craftify,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      editCraftify(values);
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
        <Text fontSize="2xl">Редактирование метода доставки</Text>
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

export default CraftifyEditForm;
