import { Stack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MyModal from "../components/myModal/my_modal";
import Header from "../components/header/header";
import Footer from "../components/footer";
import { useFetching } from "../hooks/useFetching";
import PurchaseService from "../API/purchase_service";
import TablePurchases from "../components/tablePurchases/table_purchases";
import PurchaseEditForm from "../components/forms/purchase/purchase_edit_form";
import SideMenu from "../components/side_menu";

const PurchasesPage = () => {
  const [visibleEditPurchaseModal, setVisibleEditPurchaseModal] = useState();
  const [purchaseId, setPurchaseId] = useState(-1);
  const [purchaseList, setPurchaseList] = useState([]);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCountPurchases, setTotalCountPurchases] = useState(0);

  const [getPurchaseList, purchaseListError] = useFetching(async () => {
    await PurchaseService.getPurchases(currentPage, currentPageSize).then(
      (response) => {
        setPurchaseList(response.data.purchases);
        setTotalPages(response.data.totalPages);
        setTotalCountPurchases(response.data.totalItems);
      },
    );
  });

  useEffect(() => {
    getPurchaseList();
  }, [currentPage, currentPageSize]);

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
        visibleModal={visibleEditPurchaseModal}
        setVisibleModal={setVisibleEditPurchaseModal}
      >
        <PurchaseEditForm
          setVisibleModal={setVisibleEditPurchaseModal}
          purchaseId={purchaseId}
          getPurchaseList={getPurchaseList}
        />
      </MyModal>
      <VStack
        overflowY="scroll"
        marginLeft={[200, 200, 200, 210, 220]}
        backgroundColor="menu_white"
        width="100%"
      >
        <Header title="Покупки" />
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
            Покупки
          </Text>
          <Text fontSize={14} fontWeight={400} marginBottom="20px">
            Возможно здеась будет тоже какой то поясняющий текст
          </Text>
          {purchaseListError ? (
            <div>{purchaseListError}</div>
          ) : (
            <TablePurchases
              setVisibleEditPurchaseModal={setVisibleEditPurchaseModal}
              totalCountPurchases={totalCountPurchases}
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
              totalPages={totalPages}
              purchaseList={purchaseList}
              setPurchaseId={setPurchaseId}
              getPurchaseList={getPurchaseList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </VStack>
        <Footer />
      </VStack>
    </Stack>
  );
};
export default PurchasesPage;
