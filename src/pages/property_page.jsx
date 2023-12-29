import React, { useEffect, useState } from "react";
import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import Header from "../components/header/header";
import Footer from "../components/footer";
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
    <Stack
      direction={"row"}
      height="100vh"
      spacing="0"
      backgroundColor="menu_white"
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
      <VStack overflowY="scroll" backgroundColor="menu_white" width="100%">
        <Header title="Свойства" />
        <VStack
          padding={25}
          alignItems="flex-start"
          spacing="40px"
          flexGrow={1}
          width="100%"
        >
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
            Возможно здеась будет тоже какой то поясняющий текст
          </Text>
          <HStack color={"black"} width="100%">
            <HStack color={"black"} width="100%">
              <Button
                variant="menu_yellow"
                onClick={() => setVisibleCreateModal(true)}
              >
                Добавить новое свойство
              </Button>
            </HStack>
          </HStack>
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
        <Footer />
      </VStack>
    </Stack>
  );
};

export default PropertyPage;
