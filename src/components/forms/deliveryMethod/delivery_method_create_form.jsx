import React from "react";
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

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
});

const DeliveryMethodCreateForm = ({
  getDeliveryMethodList,
  setVisibleModal,
}) => {
  const deliveryMethod = {
    name: "",
  };

  const onClose = () => {
    setVisibleModal(false);
  };

  const createDeliveryMethod = async (deliveryMethod) => {
    try {
      await DeliveryMethodService.createDeliveryMethod(deliveryMethod);
      getDeliveryMethodList();
    } catch (error) {
      console.error("Error createDeliveryMethod:", error);
    }
  };

  const formik = useFormik({
    initialValues: deliveryMethod,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      createDeliveryMethod(values);
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
        <Text fontSize="2xl">Создание метода доставки</Text>
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

export default DeliveryMethodCreateForm;
