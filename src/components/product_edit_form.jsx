import {
  Select,
  Input,
  SimpleGrid,
  Button,
  Text,
  Box,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import useWindowDimensions from "../hooks/window_dimensions";
import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import usePropertyValidation from "../hooks/property_validation";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  type: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  covering: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .nullable()
    .notRequired()
    .test("is-decimal", "invalid decimal", (value) =>
      (value + "").match(/^(\d*\.{0,1}\d{0,2}$)/)
    ),
  density: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  width: Yup.number()
    .nullable()
    .notRequired()
    .test("is-decimal", "invalid decimal", (value) =>
      (value + "").match(/^(\d*\.{0,1}\d{0,2}$)/)
    ),
  color: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  currency: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ProductEditFrom = (props) => {
  const { height, width } = useWindowDimensions();

  // Предпологаемый продукт
  const [product, setProduct] = useState({
    name: "",
    type: "",
    covering: "",
    price: "",
    density: "",
    width: "",
    color: "",
    currency: "",
    listProperties: [
      { propertyId: 1, value: "value1", name: "name1", type: "string" },
      { propertyId: 2, value: "value2", name: "name2", type: "string" },
      { propertyId: 3, value: "1000.00", name: "double", type: "double" },
      { propertyId: 4, value: "", name: "integer", type: "integer" },
    ],
  });

  // Состояние, которое говорит о том нажимали уже на кнопку сохранения или нет
  // нужна, чтобы подсвечивать красным поля не прошедшие воалидацию
  // это нужно для listProperties, для заданных свойств продукта используется Formik
  const [isSubmit, setIsSubmit] = useState(false);

  // разделяем свойства продукта, на массив свойств и свойства заданные в самом объъекте
  const initialization = () => {
    let { listProperties, ...productProperties } = product;
    return productProperties;
  };

  // Просто закрываем модалку
  const onClose = () => {
    props.setVisibleModal(false);
  };

  // Изменение для поля с деньгами
  const moneyСhangeability = (event) => {
    const validated = event.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/);
    if (
      (validated && event.target.value[0] !== "0") ||
      event.target.value === ""
    ) {
      formik.handleChange(event);
    }
  };

  // Хук для валидации и изменения свойств, сейчас внутри хука объявлен массив булевских переменных,
  // который обозначает какое поле проходит валидацию, а какое нет, в будущем, чтобы задать этот массив самому нужно воспользоваться
  // setListPropertiesValidation
  const [
    propertycСhangeability,
    listPropertiesValidation,
    setListPropertiesValidation,
  ] = usePropertyValidation();

  // Изменение значения у свойства
  const setProperty = (value, propertyIndex, type) => {
    if (propertycСhangeability(value, propertyIndex, type)) {
      product.listProperties[propertyIndex] = {
        ...product.listProperties[propertyIndex],
        value: value,
      };
      setProduct({ ...product, listProperties: product.listProperties });
    }
  };

  const formik = useFormik({
    initialValues: initialization(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!listPropertiesValidation.includes(false)) {
        alert(
          JSON.stringify(
            { ...values, listProperties: product.listProperties },
            null,
            2
          )
        );
        onClose();
      } else {
        alert(JSON.stringify(product.listProperties, null, 2));
      }
    },
  });

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        fontWeight="bold"
        mb={9}
      >
        <Text fontSize="2xl">Рулонные материалы</Text>
        <CloseButton onClick={onClose} />
      </Flex>
      <Box pb={6}>
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid
            maxH="300px"
            overflowX="scroll"
            columns={width < 768 ? 1 : 2}
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
            <Input
              isInvalid={formik.errors.name && formik.touched.name}
              errorBorderColor="crimson"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              height={8}
              placeholder="Название"
            />
            <Select
              isInvalid={formik.errors.type && formik.touched.type}
              errorBorderColor="crimson"
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              height={8}
              placeholder="Тип"
            >
              <option value="Тип 1">Тип 1</option>
              <option value="Тип 2">Тип 2</option>
              <option value="Тип 3">Тип 3</option>
            </Select>
            <Select
              isInvalid={formik.errors.covering && formik.touched.covering}
              errorBorderColor="crimson"
              id="covering"
              name="covering"
              value={formik.values.covering}
              onChange={formik.handleChange}
              height={8}
              placeholder="Покрытие"
            >
              <option value="Покрытие 1">Покрытие 1</option>
              <option value="Покрытие 2">Покрытие 2</option>
              <option value="Покрытие 3">Покрытие 3</option>
            </Select>
            <Select
              isInvalid={formik.errors.density && formik.touched.density}
              errorBorderColor="crimson"
              id="density"
              name="density"
              value={formik.values.density}
              onChange={formik.handleChange}
              height={8}
              placeholder="Плотность"
            >
              <option value="Плотность 1">Плотность 1</option>
              <option value="Плотность 2">Плотность 2</option>
              <option value="Плотность 3">Плотность 3</option>
            </Select>

            <Select
              isInvalid={formik.errors.width && formik.touched.width}
              errorBorderColor="crimson"
              id="width"
              name="width"
              value={formik.values.width}
              onChange={formik.handleChange}
              height={8}
              placeholder="Ширина"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Select>

            <Select
              isInvalid={formik.errors.color && formik.touched.color}
              errorBorderColor="crimson"
              id="color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              height={8}
              placeholder="Цвет"
            >
              <option value="Цвет 1">Цвет 1</option>
              <option value="Цвет 2">Цвет 2</option>
              <option value="Цвет 3">Цвет 3</option>
            </Select>
            <Input
              isInvalid={formik.errors.price && formik.touched.price}
              errorBorderColor="crimson"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={(event) => {
                moneyСhangeability(event);
              }}
              maxLength="13"
              height={8}
              placeholder="Цена за м^2"
            />
            <Input
              isInvalid={formik.errors.currency && formik.touched.currency}
              errorBorderColor="crimson"
              id="currency"
              name="currency"
              value={formik.values.currency}
              onChange={formik.handleChange}
              height={8}
              placeholder="Валюта"
            />
            {product.listProperties?.map((property, index) => {
              return (
                <Input
                  isInvalid={
                    listPropertiesValidation[index] === false && isSubmit
                  }
                  errorBorderColor="crimson"
                  key={index}
                  value={property.value}
                  onChange={(event) =>
                    setProperty(event.target.value, index, property.type)
                  }
                  height={8}
                  placeholder={property.name}
                />
              );
            })}
          </SimpleGrid>
          <Flex justifyContent="flex-end">
            <Button variant="menu_red" onClick={onClose} mr={3}>
              Отмена
            </Button>
            <Button
              variant="menu_yellow"
              onClick={() => setIsSubmit(true)}
              type="submit"
              me={1}
            >
              Сохранить
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default ProductEditFrom;
