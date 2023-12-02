import {
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import useWindowDimensions from "../../hooks/window_dimensions";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePropertyValidation from "../../hooks/property_validation";
import styles from "./product_edit_form.module.css";
import EditMaterialDto from "../../DTO/edit_material_dto";
import MaterialService from "../../API/material_service";

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
  //Можно написать MaterialDto
  const [product, setProduct] = useState({});

  const { height, width } = useWindowDimensions();

  const [listPropertiesValidation, setListPropertiesValidation] = useState([]);

  const [image, setImage] = useState(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const [propertyChangeability] = usePropertyValidation(
    listPropertiesValidation,
    setListPropertiesValidation,
  );

  function generateBooleanArray(n) {
    if (n <= 0) {
      return [];
    }
    return Array(n).fill(true);
  }

  const getMaterial = async (materialId) => {
    try {
      MaterialService.getMaterial(materialId).then((response) => {
        setProduct(response.data);
        setListPropertiesValidation(
          generateBooleanArray(response.data.properties.length),
        );
        setImage(null);
      });
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const putMaterial = async (id, material) => {
    try {
      const formData = new FormData();
      formData.append("updateMaterialDTO", JSON.stringify(material));
      formData.append("files", image, image.name);
      MaterialService.updateMaterial(id, formData).then(getMaterialList());
    } catch (error) {
      console.error("Error putMaterial:", error);
    }
  };

  useEffect(() => {
    if (materialId >= 0) {
      getMaterial(materialId);
    }
  }, [materialId]);

  const onClose = () => {
    setVisibleModal(false);
  };

  const fileChangedHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const moneyСhangeability = (event) => {
    const validated = event.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/);
    if (
      (validated && event.target.value[0] !== "0") ||
      event.target.value === ""
    ) {
      formik.handleChange(event);
    }
  };

  const setProperty = (value, propertyIndex, type) => {
    if (propertyChangeability(value, propertyIndex, type)) {
      product.properties[propertyIndex] = {
        ...product.properties[propertyIndex],
        value: value,
      };
      setProduct({ ...product, properties: product.properties });
    }
  };

  const formik = useFormik({
    initialValues: product,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (listPropertiesValidation.includes(false) || image === null) {
        alert(JSON.stringify(product.listProperties, null, 2));
      } else {
        putMaterial(
          values.id,
          new EditMaterialDto({ ...values, properties: product.properties }),
        );
        onClose();
      }
    },
    enableReinitialize: true,
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
            <div className={styles.input_box}>
              <label className={`${styles.label} ${styles.label_image}`}>
                Изображение
              </label>
              <Input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={fileChangedHandler}
                position="static"
                isInvalid={image === null && isSubmit}
                errorBorderColor="crimson"
                height={8}
                placeholder="Изображение"
              />
            </div>
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
            {product.properties?.map((item, index) => {
              return (
                <div className={styles.input_box} key={index}>
                  <label className={styles.label}>{item.property.name}</label>
                  <Input
                    position="static"
                    isInvalid={
                      listPropertiesValidation[index] === false && isSubmit
                    }
                    errorBorderColor="crimson"
                    value={item.value}
                    onChange={(event) =>
                      setProperty(event.target.value, index, item.property.type)
                    }
                    type={item.property.type === "DATE" ? "date" : ""}
                    height={8}
                    placeholder={item.property.name}
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
