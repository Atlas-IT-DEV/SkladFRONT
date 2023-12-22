import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import MyModal from "../components/myModal/my_modal";
import SideMenu from "../components/side_menu";
import Header from "../components/header/header";
import Footer from "../components/footer";
import DeliveryMethodService from "../API/services/deliveryMethod_service";
import TableDeliveryMethods from "../components/tables/tableDeliveryMethods/table_delivery_methods";
import DeliveryMethodCreateForm from "../components/forms/deliveryMethod/delivery_method_create_form";

const DeliveryMethodsPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
  const [deliveryMethodList, setDeliveryMethodList] = useState([]);

  const [getDeliveryMethodList, deliveryMethodListError] = useFetching(
    async () => {
      const response = await DeliveryMethodService.getDeliveryMethods();
      console.log(response.data);
      setDeliveryMethodList(response.data);
    },
  );

  useEffect(() => {
    getDeliveryMethodList();
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
        <DeliveryMethodCreateForm
          setVisibleModal={setVisibleCreateModal}
          getDeliveryMethodList={getDeliveryMethodList}
        />
      </MyModal>
      <SideMenu />
      <VStack
        overflowY="scroll"
        marginLeft={[200, 200, 200, 210, 220]}
        backgroundColor="menu_white"
        width="100%"
      >
        <Header title="Способы доставки" />
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
            Способы доставки
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
        <Footer />
      </VStack>
    </Stack>
  );
};

export default DeliveryMethodsPage;
