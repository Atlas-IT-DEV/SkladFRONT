import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TmcService from "../../../API/services/tmc_service";
import { Select } from "chakra-react-select";
import TmcTypeService from "../../../API/services/tmcType_service";
import CraftifyService from "../../../API/services/craftify_service";
import usePropertyValidationById from "../../../hooks/property_validation_by_id";
import MaterialService from "../../../API/services/material_service";
import {
  mapPropertiesValidationToArray,
  materialPropertyDTOListToArray,
} from "./support/conversion_functions";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  tmcId: Yup.number().min(1, "Too Short!").required("Required"),
  tmcTypeId: Yup.number().min(1, "Too Short!").required("Required"),
  tmCraftifyIdList: Yup.array(
    Yup.number().min(1, "Too Short!").required("Required")
  ).max(20, "Too Long!"),
  show: Yup.boolean().required("Required"),
  trim: Yup.boolean().required("Required"),
});

const MaterialCreateForm = ({ setVisibleModal, getMaterialList }) => {
  //Можно написать MaterialDto
  const [material, setMaterial] = useState({
    name: "",
    tmcId: "",
    tmcTypeId: "",
    tmCraftifyIdList: [],
    materialPropertyDTOList: new Map(),
    show: true,
    trim: true,
  });

  const [tmcList, setTmcList] = useState([]);

  const [tmcTypeList, setTmcTypeList] = useState([]);

  const [craftifyList, setCraftifyTypeList] = useState([]);

  const [mapPropertiesValidation, setMapPropertiesValidation] = useState(
    new Map()
  );

  const [currentProperties, setCurrentProperties] = useState([]);

  const [images, setImages] = useState(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const refImageInput = useRef();

  const [propertyChangeability, changeMapPropertiesValidation] =
    usePropertyValidationById(
      mapPropertiesValidation,
      setMapPropertiesValidation
    );

  const createMaterial = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "insertMaterialDTO ",
        JSON.stringify({
          ...material,
          materialPropertyDTOList: materialPropertyDTOListToArray(
            material.materialPropertyDTOList
          ),
        })
      );
      for (let i = 0; i < images?.length; i++) {
        formData.append("files", images[i]);
      }
      await MaterialService.createMaterial(formData).then(() => {
        getMaterialList();
      });
    } catch (error) {
      console.error("Error putMaterial:", error);
    }
  };

  const getTmcs = async () => {
    try {
      await TmcService.getTmcs().then((response) => {
        setTmcList(response.data);
      });
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const getTmcTypes = async () => {
    try {
      await TmcTypeService.getTmcTypes().then((response) => {
        setTmcTypeList(
          response.data.map((craftify) => {
            return { value: craftify.id, label: craftify.name };
          })
        );
      });
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const getCraftifies = async () => {
    try {
      await CraftifyService.getCraftifies().then((response) => {
        setCraftifyTypeList(
          response.data.map((tmcType) => {
            return { value: tmcType.id, label: tmcType.name };
          })
        );
      });
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  useEffect(() => {
    getTmcs();
    getTmcTypes();
    getCraftifies();
  }, []);

  const onClose = () => {
    setVisibleModal(false);
  };

  const changeProperty = (value, propertyId, type) => {
    const changeability = propertyChangeability(value, propertyId, type);
    if (changeability) {
      material.materialPropertyDTOList.set(propertyId, value);
      setMaterial({
        ...material,
        materialPropertyDTOList: material.materialPropertyDTOList,
      });
    }
  };

  const changeTmCraftifyIdList = (e) => {
    setMaterial({
      ...material,
      tmCraftifyIdList: e.map((craftify) => craftify.value),
    });
  };

  const changeTmcId = (e) => {
    const result = tmcList.find((Tmc) => {
      return Tmc.id === e.value;
    });
    changeMapPropertiesValidation(result.properties);
    const newCurrentProperties = [];
    const newMaterialPropertyDTOList = new Map();
    result.properties?.forEach((property) => {
      if (material.materialPropertyDTOList.has(property.id)) {
        newMaterialPropertyDTOList.set(
          property.id,
          material.materialPropertyDTOList.get(property.id)
        );
      } else {
        newMaterialPropertyDTOList.set(property.id, "");
      }
      newCurrentProperties.push({
        id: property.id,
        name: property.name,
        type: property.type,
        value: "",
      });
    });
    setCurrentProperties(newCurrentProperties);
    setMaterial({
      ...material,
      tmcId: e.value,
      materialPropertyDTOList: newMaterialPropertyDTOList,
    });
  };

  const imageChangedHandler = (event) => {
    try {
      const dt = new DataTransfer();
      for (let i = 0; i < event.target.files.length; i++) {
        if (
          event.target.files[i].type === "image/jpeg" ||
          event.target.files[i].type === "image/png"
        ) {
          dt.items.add(event.target.files[i]);
        }
      }
      event.target.files = dt.files;
      setImages(dt.files);
    } catch (error) {
      console.error("Error imageChangedHandler:", error);
    }
  };

  const clearImages = () => {
    refImageInput.current.value = null;
    setImages(refImageInput.current.files);
  };

  const formik = useFormik({
    initialValues: material,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (
        !mapPropertiesValidationToArray(mapPropertiesValidation).includes(false)
      ) {
        createMaterial();
        onClose();
        setSubmitting(false);
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
        <Text fontSize="2xl">Создание материала</Text>
        <CloseButton onClick={onClose} />
      </Flex>
      <Box pb={6}>
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid
            maxH="500px"
            width={["300px", "350px", "400px", "450px", "500px"]}
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
            <div>
              <HStack>
                <label>Изображения</label>
                <CloseButton onClick={clearImages} />
              </HStack>
              <Input
                height={8}
                ref={refImageInput}
                borderColor="white"
                focusBorderColor="white"
                _hover={{ borderColor: "white" }}
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={imageChangedHandler}
                multiple
                maxWidth="100%"
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                placeholder="Изображение"
              />
            </div>
            <div>
              <label>Имя</label>
              <Input
                isInvalid={formik.errors.name && formik.touched.name}
                errorBorderColor="crimson"
                id="name"
                name="name"
                value={material.name}
                onChange={(e) =>
                  setMaterial({ ...material, name: e.target.value })
                }
                height="40px"
                placeholder="Название"
                maxWidth="100%"
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
              />
            </div>
            <div>
              <label>ТМЦ</label>
              <Select
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                isInvalid={formik.errors.tmcId && formik.touched.tmcId}
                errorBorderColor="crimson"
                options={tmcList.map((tmc) => {
                  return { value: tmc.id, label: tmc.name };
                })}
                id="tmcId"
                name="tmcId"
                onChange={(e) => changeTmcId(e)}
                placeholder="Тип"
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
              ></Select>
            </div>
            <div>
              <label>Тип ТМЦ</label>
              <Select
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                isInvalid={formik.errors.tmcTypeId && formik.touched.tmcTypeId}
                errorBorderColor="crimson"
                options={tmcTypeList}
                id="tmcTypeId"
                name="tmcTypeId"
                onChange={(e) =>
                  setMaterial({ ...material, tmcTypeId: e.value })
                }
                placeholder="Тип ТМЦ"
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
              ></Select>
            </div>
            <div>
              <label>Способы обработки</label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                menuPortalTarget={document.body}
                isInvalid={
                  formik.errors.tmCraftifyIdList &&
                  formik.touched.tmCraftifyIdList
                }
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                errorBorderColor="crimson"
                options={craftifyList}
                onChange={(e) => changeTmCraftifyIdList(e)}
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                placeholder="Способы обработки"
              ></Select>
            </div>
            <Stack spacing={[1, 5]} direction={["column", "row"]} >
              <Checkbox
                size="md"
                colorScheme="green"
                isChecked={material.show}
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                onChange={(e) =>
                  setMaterial({ ...material, show: e.target.checked })
                }
              >
                Показывать
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="green"
                isChecked={material.trim}
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                onChange={(e) =>
                  setMaterial({ ...material, trim: e.target.checked })
                }
              >
                Обрезок
              </Checkbox>
            </Stack>
            {currentProperties?.map((item, index) => {
              return (
                <div key={item.id}>
                  {item.type === "BOOLEAN" ? (
                    <Checkbox
                      size="md"
                      colorScheme="green"
                      isChecked={material.materialPropertyDTOList.get(item.id)}
                      onChange={(event) =>
                        changeProperty(event.target.checked, item.id, item.type)
                      }
                    >
                      {item.name}
                    </Checkbox>
                  ) : (
                    <div>
                      <label>{item.name}</label>
                      <Input
                        isInvalid={
                          mapPropertiesValidation.get(item.id) === false &&
                          isSubmit
                        }
                        errorBorderColor="crimson"
                        value={material.materialPropertyDTOList.get(item.id)}
                        onChange={(event) =>
                          changeProperty(event.target.value, item.id, item.type)
                        }
                        type={item.type === "DATE" ? "date" : ""}
                        height="40px"
                        placeholder={item.name}
                        maxWidth="100%"
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                      />
                    </div>
                  )}
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
