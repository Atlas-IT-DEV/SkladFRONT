import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditMaterialDto from "../../../dto/edit_material_dto";
import MaterialService from "../../../API/material_service";
import ImageService from "../../../API/image_service";
import { Select } from "chakra-react-select";
import TmcCraftifyService from "../../../API/tmcCraftify_service";
import usePropertyValidationById from "../../../hooks/property_validation_by_id";
import {
  arrayBufferToBase64,
  base64ToFile,
  mapPropertiesValidationToArray,
  materialPropertyDTOListToArray,
} from "./support/conversion_functions";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  comment: Yup.string().nullable().min(1, "Too Short!").max(300, "Too Long!"),
  tmCraftifyIdList: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().min(1, "Too Short!").required("Required"),
        name: Yup.string()
          .min(1, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
      }),
    )
    .max(20, "Too Long!"),
  show: Yup.boolean().required("Required"),
});

const MaterialEditForm = ({ setVisibleModal, materialId, getMaterialList }) => {
  //Можно написать MaterialDto
  const [material, setMaterial] = useState(new EditMaterialDto());

  const [mapPropertiesValidation, setMapPropertiesValidation] = useState(
    new Map(),
  );

  const [images, setImages] = useState(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const [craftifyList, setCraftifyList] = useState([]);

  const [currentProperties, setCurrentProperties] = useState([]);

  const [propertyChangeability] = usePropertyValidationById(
    mapPropertiesValidation,
    setMapPropertiesValidation,
  );

  const refImageInput = useRef();

  const selectCraftifiesRef = useRef();

  const generateBooleanMap = (properties) => {
    if (properties !== undefined) {
      const propertiesValidation = new Map();
      properties.forEach((obj) => {
        propertiesValidation.set(obj.property.id, true);
      });
      return propertiesValidation;
    }
  };

  const getImages = async (images) => {
    const imagesArray = [];
    for (const image of images) {
      await ImageService.getImage(image.path).then((response) => {
        imagesArray.push(
          base64ToFile(arrayBufferToBase64(response.data), image.path),
        );
      });
    }
    return imagesArray;
  };

  const getMaterial = async (materialId) => {
    try {
      const response = await MaterialService.getMaterial(materialId);
      selectCraftifiesRef.current?.setValue(
        response.data.tmCraftifies.map((crafty) => {
          return { value: crafty.id, label: crafty.name };
        }),
      );
      setMaterial(new EditMaterialDto(response.data));
      setCurrentProperties(
        response.data.properties?.map((item) => {
          return {
            id: item.property.id,
            name: item.property.name,
            type: item.property.type,
          };
        }),
      );
      setMapPropertiesValidation(generateBooleanMap(response.data.properties));
      setIsSubmit(false);
      const images = await getImages(response.data.images);
      const dt = new DataTransfer();
      images.forEach((image) => {
        dt.items.add(image);
      });
      refImageInput.current.files = dt.files;
      setImages(images);
    } catch (error) {
      console.error("Error getMaterial:", error);
    }
  };

  const updateMaterial = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "updateMaterialDTO",
        JSON.stringify({
          ...material,
          tmCraftifyIdList: material.tmCraftifyIdList.map(
            (craftify) => craftify.id,
          ),
          materialPropertyDTOList: materialPropertyDTOListToArray(
            material.materialPropertyDTOList,
          ),
        }),
      );
      for (let i = 0; i < images?.length; i++) {
        formData.append("files", images[i]);
      }
      await MaterialService.updateMaterial(materialId, formData).then(() => {
        getMaterialList();
      });
    } catch (error) {
      console.error("Error putMaterial:", error);
    }
  };

  const getTmcCraftifies = async () => {
    try {
      await TmcCraftifyService.getTmcCraftifies().then((response) => {
        setCraftifyList(
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
    if (materialId > 0) {
      getMaterial(materialId);
      getTmcCraftifies();
    }
  }, [materialId]);

  const onClose = () => {
    setVisibleModal(false);
  };

  const clearImages = () => {
    refImageInput.current.value = null;
    setImages(refImageInput.current.files);
  };

  const imageChangedHandler = (event) => {
    setImages(event.target.files);
  };

  const changeTmCraftifyIdList = (e) => {
    setMaterial({
      ...material,
      tmCraftifyIdList: e?.map((craftify) => {
        return {
          id: craftify.value,
          name: craftify.label,
        };
      }),
    });
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

  const formik = useFormik({
    initialValues: material,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (
        !mapPropertiesValidationToArray(mapPropertiesValidation).includes(false)
      ) {
        updateMaterial();
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
        <Text fontSize="2xl">Редактироваие материала</Text>
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
            <div>
              <HStack>
                <label>Изображение</label>
                <CloseButton onClick={clearImages} />
              </HStack>
              <Input
                multiple
                borderColor="white"
                focusBorderColor="white"
                _hover={{ borderColor: "white" }}
                height={8}
                ref={refImageInput}
                type="file"
                accept=".jpg, .jpeg"
                onChange={imageChangedHandler}
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
              />
            </div>
            <div>
              <label>Комментарий</label>
              <Input
                isInvalid={formik.errors.comment && formik.touched.comment}
                errorBorderColor="crimson"
                value={material.comment || ""}
                id="comment"
                name="comment"
                onChange={(e) =>
                  setMaterial({ ...material, comment: e.target.value })
                }
                height="40px"
                placeholder="Комментарий"
              />
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
                ref={selectCraftifiesRef}
                options={craftifyList}
                onChange={(e) => changeTmCraftifyIdList(e)}
                placeholder="Способы обработки"
              ></Select>
            </div>
            <Checkbox
              size="md"
              isChecked={material?.show}
              colorScheme="green"
              onChange={(e) =>
                setMaterial({ ...material, show: e.target.checked })
              }
            >
              Показывать
            </Checkbox>
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

export default MaterialEditForm;