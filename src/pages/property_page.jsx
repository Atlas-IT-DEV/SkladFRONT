import React, { useEffect, useState } from "react";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
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
      spacing="40px"
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
        fontSize={[24, 26, 28, 32, 36]}
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Свойства
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Страница создания и редактирования свойств
      </Text>
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
