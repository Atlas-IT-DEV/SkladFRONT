import {
  Select,
  Input,
  SimpleGrid,
  Button,
  Text,
  Box,
  CloseButton,
  Flex,
  FormLabel,
} from "@chakra-ui/react";
import useWindowDimensions from "../../hooks/window_dimensions";
import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import usePropertyValidation from "../../hooks/property_validation";
import styles from "./product_edit_form.module.css";
import { Instance } from "../../API/instance";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  comment: Yup.string()
    .min(1, "Too Short!")
    .max(300, "Too Long!")
    .required("Required"),
});

const ProductEditFrom = ({ setVisibleModal, materialId, getMaterialList }) => {
  const { height, width } = useWindowDimensions();

  const getMaterial = async (materialId) => {
    try {
      Instance.get(`api/materials/${materialId}`).then((response) => {
        setProduct(response.data);
        // console.log(`getMaterial: ${materialId}`, response.data);
      });
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const putMaterial = async (material) => {
    try {
      Instance.put(`api/materials/${material.id}`, material).then(
        (response) => {
          console.log("putMaterial", response.data);
          getMaterialList();
        },
      );
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  useEffect(() => {
    if (materialId >= 0) {
      getMaterial(materialId);
    }
  }, [materialId]);

  // Предпологаемый продукт
  const [product, setProduct] = useState({
    name: "name",
    type: "type",
    covering: "covering",
    price: "price",
    density: "density",
    width: "width",
    color: "color",
    currency: "currency",
  });

  const initProduct = {
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
      { propertyId: 4, value: "", name: "boolean", type: "boolean" },
      { propertyId: 4, value: "", name: "date", type: "date" },
    ],
  };

  // Состояние, которое говорит о том нажимали уже на кнопку сохранения или нет
  // нужна, чтобы подсвечивать красным поля не прошедшие воалидацию
  // это нужно для listProperties, для заданных свойств продукта используется Formik
  const [isSubmit, setIsSubmit] = useState(false);

  // разделяем свойства продукта, на массив свойств и свойства заданные в самом объъекте
  const initialization = () => {
    let { listProperties, ...productProperties } = initProduct;
    // console.log(productProperties);
    return productProperties;
  };

  // Просто закрываем модалку
  const onClose = () => {
    setVisibleModal(false);
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

  // console.log(product);
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
  const ref = useRef(null);

  const someFuncton = () => {
    console.log(ref.current);
  };

  const formik = useFormik({
    initialValues: product,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (listPropertiesValidation.includes(false)) {
        alert(JSON.stringify(product.listProperties, null, 2));
      } else {
        values.tmcId = values.tmc.id;
        values.tmcTypeId = values.tmcType.id;
        putMaterial(values);
        onClose();
      }
    },
    enableReinitialize: true,
  });
  // console.log(formik.values);
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
      {/*<Formik pb={6}>*/}
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
            <div className={styles.input_box}>
              <label className={styles.label}>Имя</label>
              <Input
                position="static"
                isInvalid={formik.errors.name && formik.touched.name}
                errorBorderColor="crimson"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                height={8}
                placeholder="Название"
              />
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>Комментарий</label>
              <Input
                position="static"
                isInvalid={formik.errors.comment && formik.touched.comment}
                errorBorderColor="crimson"
                id="comment"
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                height={8}
                placeholder="Комментарий"
              />
            </div>
            {product.listProperties?.map((property, index) => {
              return (
                <div className={styles.input_box} key={index}>
                  <label className={styles.label}>{property.name}</label>
                  <Input
                    position="static"
                    isInvalid={
                      listPropertiesValidation[index] === false && isSubmit
                    }
                    errorBorderColor="crimson"
                    value={property.value}
                    onChange={(event) =>
                      setProperty(event.target.value, index, property.type)
                    }
                    type={property.type === "date" ? "date" : ""}
                    height={8}
                    placeholder={property.name}
                  />
                </div>
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
