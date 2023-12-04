import {
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import useWindowDimensions from "../../../hooks/window_dimensions";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./material_create_form.module.css";
import TmcService from "../../../API/tmc_service";
import { Select } from "chakra-react-select";
import TmcTypeService from "../../../API/tmcType_service";
import TmcCraftifyService from "../../../API/tmcCraftify_service";
import usePropertyValidationById from "../../../hooks/property_validation_by_id";
import MaterialService from "../../../API/material_service";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  tmcId: Yup.number()
    .min(1, "Too Short!")
    .max(18, "Too Long!")
    .required("Required"),
  tmcTypeId: Yup.number()
    .min(1, "Too Short!")
    .max(18, "Too Long!")
    .required("Required"),
  tmCraftifyIdList: Yup.array(
    Yup.number().min(1, "Too Short!").max(18, "Too Long!").required("Required"),
  )
    .min(1, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  materialPropertyDTOList: Yup.array(
    Yup.object({
      propertyId: Yup.number()
        .min(1, "Too Short!")
        .max(18, "Too Long!")
        .required("Required"),
      value: Yup.string()
        .min(1, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    }),
  )
    .min(1, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  show: Yup.boolean().required("Required"),
  trim: Yup.boolean().required("Required"),
});

const MaterialCreateForm = ({
  setVisibleModal,
  materialId,
  getMaterialList,
}) => {
  //Можно написать MaterialDto
  const [material, setMaterial] = useState({
    name: "",
    tmcId: 0,
    tmcTypeId: 0,
    tmCraftifyIdList: [],
    materialPropertyDTOList: [
      {
        propertyId: 0,
        value: "string",
      },
    ],
    show: true,
    trim: true,
  });

  const [tmcList, setTmcList] = useState([]);

  const [originTmcList, setOriginTmcList] = useState([]);

  const [tmcTypeList, setTmcTypeList] = useState([]);

  const [craftifyList, setCraftifyTypeList] = useState([]);

  const { height, width } = useWindowDimensions();

  const [listPropertiesValidation, setListPropertiesValidation] = useState([]);

  const [image, setImage] = useState(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const [propertyChangeability] = usePropertyValidationById(
    listPropertiesValidation,
    setListPropertiesValidation,
  );

  const createMaterial = async (insertMaterial) => {
    try {
      const formData = new FormData();
      formData.append("insertMaterialDTO ", JSON.stringify(insertMaterial));
      formData.append("files", image, image.name);
      MaterialService.createMaterial(formData).then(() => {
        getMaterialList();
      });
    } catch (error) {
      console.error("Error putMaterial:", error);
    }
  };

  const getTmcs = async () => {
    try {
      TmcService.getTmcs().then((response) => {
        setOriginTmcList(response.data);
        setTmcList(
          response.data.map((tmc) => {
            return { value: tmc.id, label: tmc.name };
          }),
        );
      });
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const getTmcTypes = async () => {
    try {
      TmcTypeService.getTmcTypes().then((response) => {
        setTmcTypeList(
          response.data.map((craftify) => {
            return { value: craftify.id, label: craftify.name };
          }),
        );
      });
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const getTmcCraftifies = async () => {
    try {
      TmcCraftifyService.getTmcCraftifies().then((response) => {
        setCraftifyTypeList(
          response.data.map((tmcType) => {
            return { value: tmcType.id, label: tmcType.name };
          }),
        );
      });
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  useEffect(() => {
    getTmcs();
    getTmcTypes();
    getTmcCraftifies();
  }, []);

  const onClose = () => {
    setVisibleModal(false);
  };

  const fileChangedHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const setProperty = (value, propertyId, type) => {
    const changeability = propertyChangeability(value, propertyId, type);
    if (changeability) {
      let index = material.materialPropertyDTOList.findIndex(
        (property) => property.propertyId === propertyId,
      );
      material.materialPropertyDTOList[index] = {
        propertyId: material.materialPropertyDTOList[index].propertyId,
        value: value,
      };
      setMaterial({
        ...material,
        materialPropertyDTOList: material.materialPropertyDTOList,
      });
    }
  };

  const formik = useFormik({
    initialValues: material,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert("FSEGFESGFESG");
      createMaterial(material);
      onClose();
    },
    enableReinitialize: true,
  });

  const setPropertiesValidation = (properties) => {
    setListPropertiesValidation(
      properties.map((property) => {
        const res = listPropertiesValidation.find((propertyValid) => {
          return property.id === propertyValid.id;
        });
        if (res === undefined) {
          return {
            id: property.id,
            validity: false,
          };
        } else {
          return {
            id: res.id,
            validity: res.validity,
          };
        }
      }),
    );
  };

  const change = (e) => {
    setPropertiesValidation(e);
    setCurrentProperties(
      e.map((property) => {
        return {
          id: property.id,
          name: property.label,
          type: property.type,
          value: "",
        };
      }),
    );
    setMaterial({
      ...material,
      materialPropertyDTOList: e.map((property) => {
        return {
          propertyId: property.id,
          value: "",
        };
      }),
    });
  };
  const changeTmCraftifyIdList = (e) => {
    setMaterial({
      ...material,
      tmCraftifyIdList: e.map((craftify) => craftify.value),
    });
  };

  const [potentialProperties, setPotentialProperties] = useState([]);

  const [currentProperties, setCurrentProperties] = useState([]);

  const changeTmcId = (e) => {
    selectRef.current?.clearValue();
    setMaterial({ ...material, tmcId: e.value, materialPropertyDTOList: [] });
    var result = originTmcList.find((Tmc) => {
      return Tmc.id === e.value;
    });

    setPotentialProperties(
      result?.properties?.map((property) => {
        return {
          value: property.id,
          id: property.id,
          label: property.name,
          type: property.type,
        };
      }),
    );
  };
  const selectRef = useRef();

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
                value={material.name}
                onChange={(e) =>
                  setMaterial({ ...material, name: e.target.value })
                }
                height={8}
                placeholder="Название"
              />
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>ТМЦ</label>
              <Select
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                position="static"
                isInvalid={formik.errors.tmcId && formik.touched.tmcId}
                errorBorderColor="crimson"
                options={tmcList}
                id="tmcId"
                name="tmcId"
                onChange={(e) => changeTmcId(e)}
                height={8}
                placeholder="Тип"
              ></Select>
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>Тип ТМЦ</label>
              <Select
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                position="static"
                isInvalid={formik.errors.tmcTypeId && formik.touched.tmcTypeId}
                errorBorderColor="crimson"
                options={tmcTypeList}
                id="tmcTypeId"
                name="tmcTypeId"
                onChange={(e) =>
                  setMaterial({ ...material, tmcTypeId: e.value })
                }
                height={8}
                placeholder="Тип ТМЦ"
              ></Select>
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>tmCraftifyIdList</label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                position="static"
                errorBorderColor="crimson"
                // value={currentProperties}
                options={craftifyList}
                onChange={
                  (e) => changeTmCraftifyIdList(e)
                  // setMaterial({ ...material, tmCraftifyIdList: e.value })
                }
                height={8}
                placeholder="tmCraftifyIdList"
              ></Select>
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>Свойтсва</label>
              <Select
                ref={selectRef}
                isMulti
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                position="static"
                errorBorderColor="crimson"
                options={potentialProperties}
                onChange={(e) => change(e)}
                height={8}
                placeholder="Свойтсва"
              ></Select>
            </div>
            {/*<div className={styles.input_box}>*/}
            {/*  <label className={styles.label}>Свойтсва</label>*/}
            {/*  <Input*/}
            {/*    position="static"*/}
            {/*    isInvalid={*/}
            {/*      formik.errors.materialPropertyDTOList &&*/}
            {/*      formik.touched.materialPropertyDTOList*/}
            {/*    }*/}
            {/*    errorBorderColor="crimson"*/}
            {/*    id="materialPropertyDTOList"*/}
            {/*    name="materialPropertyDTOList"*/}
            {/*    value={formik.values.materialPropertyDTOList}*/}
            {/*    onChange={formik.handleChange}*/}
            {/*    height={8}*/}
            {/*    placeholder="Свойтсва"*/}
            {/*  />*/}
            {/*</div>*/}
            {currentProperties?.map((item, index) => {
              return (
                <div className={styles.input_box} key={index}>
                  {item.value}
                  <label className={styles.label}>{item.name}</label>
                  <Input
                    position="static"
                    isInvalid={
                      listPropertiesValidation[index] === false && isSubmit
                    }
                    errorBorderColor="crimson"
                    value={
                      material.materialPropertyDTOList.find(
                        (property) => property.propertyId === item.id,
                      ).value
                    }
                    onChange={(event) =>
                      setProperty(event.target.value, item.id, item.type)
                    }
                    type={item.type === "DATE" ? "date" : ""}
                    height={8}
                    placeholder={item.name}
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

export default MaterialCreateForm;
