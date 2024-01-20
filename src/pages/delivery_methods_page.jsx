import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import DeliveryMethodService from "../API/services/deliveryMethod_service";
import TableDeliveryMethods from "../components/tables/tableDeliveryMethods/table_delivery_methods";
import DeliveryMethodCreateForm from "../components/forms/deliveryMethod/delivery_method_create_form";

const DeliveryMethodsPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [deliveryMethodList, setDeliveryMethodList] = useState([]);

  const [getDeliveryMethodList, deliveryMethodListError] = useFetching(
    async () => {
      const response = await DeliveryMethodService.getDeliveryMethods();
      setDeliveryMethodList(response.data);
    },
  );

  useEffect(() => {
    getDeliveryMethodList();
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
        <DeliveryMethodCreateForm
          setVisibleModal={setVisibleCreateModal}
          getDeliveryMethodList={getDeliveryMethodList}
        />
      </MyModal>
      <Text
        color="#000"
        fontSize={[24, 26, 28, 32, 36]}
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Способы доставки
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Добавление и редактирование способов доставки
      </Text>
      <HStack color={"black"} width="100%">
        <HStack color={"black"} width="100%">
          <Button
            variant="menu_yellow"
            onClick={() => setVisibleCreateModal(true)}
          >
            Добавить новый способ доставки
          </Button>
        </HStack>
      </HStack>
      {deliveryMethodListError ? (
        <div>{deliveryMethodListError}</div>
      ) : (
        <TableDeliveryMethods
          setVisibleCreateModal={setVisibleCreateModal}
          getDeliveryMethodList={getDeliveryMethodList}
          deliveryMethodList={deliveryMethodList}
        />
      )}
    </VStack>
  );
};

export default DeliveryMethodsPage;
