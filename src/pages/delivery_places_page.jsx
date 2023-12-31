import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import Header from "../components/header/header";
import Footer from "../components/footer";
import DeliveryPlaceService from "../API/services/deliveryPlaces_service";
import DeliveryPlaceCreateForm from "../components/forms/deliveryPlaces/delivery_place_create_form";
import TableDeliveryPlaces from "../components/tables/tableDeliveryPlaces/table_delivery_places";

const DeliveryPlacesPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [deliveryPlaceList, setDeliveryPlaceList] = useState([]);

  const [getDeliveryPlaceList, deliveryPlaceListError] = useFetching(
    async () => {
      const response = await DeliveryPlaceService.getDeliveryPlaces();
      setDeliveryPlaceList(response.data);
    },
  );

  useEffect(() => {
    getDeliveryPlaceList();
  }, []);

  return (
    <VStack backgroundColor="menu_white" width="100%" height="100vh">
      <MyModal
        visibleModal={visibleCreateModal}
        setVisibleModal={setVisibleCreateModal}
      >
        <DeliveryPlaceCreateForm
          setVisibleModal={setVisibleCreateModal}
          getDeliveryPlaceList={getDeliveryPlaceList}
        />
      </MyModal>
      <Header />
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
          Адреса отгрузки
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
              Добавить новый адрес отгрузки
            </Button>
          </HStack>
        </HStack>
        {deliveryPlaceListError ? (
          <div>{deliveryPlaceListError}</div>
        ) : (
          <TableDeliveryPlaces
            setVisibleCreateModal={setVisibleCreateModal}
            getDeliveryPlaceList={getDeliveryPlaceList}
            deliveryPlaceList={deliveryPlaceList}
          />
        )}
      </VStack>
      <Footer />
    </VStack>
  );
};

export default DeliveryPlacesPage;
