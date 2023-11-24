import { VStack, Stack, HStack, Button, Text } from "@chakra-ui/react";

import SideMenu from "../components/side_menu";
import { useEffect, useState } from "react";
import MyModal from "../components/myModal/my_modal";
import ProductEditFrom from "../components/productEditForm/product_edit_form";
import Header from "../components/header/header";
import Footer from "../components/footer";
import Table from "../components/table/table";
import { Instance } from "../API/instance";

const MaterialsPage = () => {
  const [visibleModal, setVisibleModal] = useState();
  const [materialId, setMaterialId] = useState();
  const [materialList, setMaterialList] = useState();

  const getMaterialList = async () => {
    try {
      Instance.get("api/materials").then((response) => {
        setMaterialList(response.data);
      });
    } catch (error) {
      console.error("Error getMaterialList:", error);
    }
  };

  useEffect(() => {
    getMaterialList();
  }, []);
  return (
    <Stack
      direction={"row"}
      height="100vh"
      spacing="0"
      backgroundColor="menu_white"
      width="100%"
    >
      <SideMenu />
      <MyModal
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        materialId={materialId}
      >
        <ProductEditFrom setVisibleModal={setVisibleModal} />
      </MyModal>
      <VStack
        marginLeft={[200, 200, 200, 210, 220]}
        backgroundColor="menu_white"
        width="100%"
      >
        <Header title="Материалы" />
        <VStack
          padding={25}
          alignItems="flex-start"
          overflowY="scroll"
          spacing="40px"
          height="100%"
          width="100%"
        >
          <Text
            color="#000"
            fontSize={[24, 26, 28, 32, 36]}
            fontWeight={700}
            lineHeight="normal"
            fontStyle="normal"
          >
            Материалы
          </Text>
          <Text fontSize={14} fontWeight={400} marginBottom="20px">
            Возможно здеась будет тоже какой то поясняющий текст
          </Text>
          <Table
            materialList={materialList}
            setVisibleModal={setVisibleModal}
            setMaterialId={setMaterialId}
            getMaterialList={getMaterialList}
          />
        </VStack>
        <Footer />
      </VStack>
    </Stack>
  );
};
export default MaterialsPage;
