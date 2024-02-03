import React, { useEffect, useState } from "react";
import { Button, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import TableProperties from "../components/tables/tableProperties/table_properties";
import MyModal from "../components/myModal/my_modal";
import PropertyCreateForm from "../components/forms/property/property_create_form";
import { useFetching } from "../hooks/useFetching";
import PropertyService from "../API/services/property_service";

const PropertyPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [propertyList, setPropertyList] = useState([]);

  const [getPropertyList, propertyListError] = useFetching(async () => {
    const response = await PropertyService.getProperties();
    setPropertyList(response.data);
  });

  useEffect(() => {
    getPropertyList();
  }, []);

  return (
    <VStack
      padding={25}
      alignItems="flex-start"
      spacing="20px"
      flexGrow={1}
      width="100%"
    >
      <MyModal
        visibleModal={visibleCreateModal}
        setVisibleModal={setVisibleCreateModal}
      >
        <PropertyCreateForm
          setVisibleModal={setVisibleCreateModal}
          getPropertyList={getPropertyList}
        />
      </MyModal>
      <Text
        color="#000"
        fontSize="22px !important"
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Свойства
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Страница создания и редактирования свойств
      </Text>
      <HStack color={"black"} width="100%">
        <HStack color={"black"} width="100%">
          <Tooltip
            label="Чтобы создать свойство, задайте его название и укажите, какие данные оно хранит"
            aria-label="Подсказка"
          >
            <Button
              variant="menu_yellow"
              onClick={() => setVisibleCreateModal(true)}
            >
              Добавить свойство
            </Button>
          </Tooltip>
        </HStack>
      </HStack>
      ee
      {propertyListError ? (
        <div>{propertyListError}</div>
      ) : (
        <TableProperties
          setVisibleCreateModal={setVisibleCreateModal}
          getPropertyList={getPropertyList}
          propertyList={propertyList}
        />
      )}
    </VStack>
  );
};

export default PropertyPage;
