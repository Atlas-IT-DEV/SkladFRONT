import React, { useEffect, useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import styles from "../forTable/table.module.css";
import Pagination from "../../pagination/pagination";
import PurchaseService from "../../../API/services/purchase_service";
import UrForTable from "../forTable/ulForTable/ul_for_table";
import UlToClickPurchase from "../tablePurchases/ulToClickPurchase/ul_to_click_purchase";
import { useFetching } from "../../../hooks/useFetching";
import MyModal from "../../myModal/my_modal";
import PurchaseEditForm from "../../forms/purchase/purchase_edit_form";
import useWindowDimensions from "../../../hooks/window_dimensions";
import SupplierService from "../../../API/services/supplier_service";
import DeliveryMethodCreateForm from "../../forms/deliveryMethod/delivery_method_create_form";
import SupplierCreateForm from "../../forms/suppliers/supplier_create_form";
import UlToClickSuppliers from "./ulToClickSuppliers";
import SupplierEditForm from "../../forms/suppliers/supplier_edit_form";

const TableSuppliers = () => {
  const [sort, setSort] = useState(false);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseList, setPurchaseList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCountPurchases, setTotalCountPurchases] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState();
  const [supplierId, setSupplierId] = useState(-1);
  const { width, height } = useWindowDimensions();

  const [getPurchaseList, purchaseListError] = useFetching(async () => {
    await SupplierService.getSuppliersClients(
      currentPage,
      currentPageSize
    ).then((response) => {
      setPurchaseList(response.data.suppliers);
      setTotalPages(response.data.totalPages);
      setTotalCountPurchases(response.data.totalItems);
      console.log(response);
    });
  });
  const [visibleCreateModal, setVisibleCreateModal] = useState();

  useEffect(() => {
    getPurchaseList();
  }, [currentPage, currentPageSize]);

  return (
    <VStack width={"100%"} align={"flex-start"} spacing={"15px"}>
      <Button
        variant={"menu_yellow"}
        onClick={() => setVisibleCreateModal(true)}
      >
        Добавить поставщика
      </Button>
      <Box
        className={styles.table__Box}
        overflowX={width <= 944 ? "scroll" : "auto"}
        display="block"
        width={width <= 944 ? "100%" : "100%"}
      >
        <MyModal
          visibleModal={visibleEditModal}
          setVisibleModal={setVisibleEditModal}
        >
          <SupplierEditForm
            setVisibleModal={setVisibleEditModal}
            supplierId={supplierId}
            getSuppliersList={getPurchaseList}
          />
        </MyModal>
        <MyModal
        visibleModal={visibleCreateModal}
        setVisibleModal={setVisibleCreateModal}
      >
        <SupplierCreateForm
          setVisibleModal={setVisibleCreateModal}
          getSuppliersList={getPurchaseList}
        />
      </MyModal>
        {purchaseListError ? (
          <div>{purchaseListError}</div>
        ) : (
          <table
            className={styles.table}
            width={width <= 944 ? "944px" : "100%"}
          >
            <thead>
              <tr className={styles.table__thead_tr}>
                <td className={styles.table__td}>
                  <UrForTable name="№" />
                </td>
                <td>
                  <UrForTable
                    sort={sort}
                    setSort={setSort}
                    name="Название поставщика"
                  />
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {purchaseList?.map((purchase, index) => (
                <tr className={styles.table__tbody_tr} key={purchase.id}>
                  <td className={styles.table__td}>{index + 1}.</td>
                  <td className={styles.table__td}>{purchase.name}</td>
                  <td className={styles.table__td}>
                    <UlToClickSuppliers
                      supplierId={purchase.id}
                      setSupplierId={setSupplierId}
                      setVisibleEditSupplierModal={setVisibleEditModal}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          totalCountItem={totalCountPurchases}
          className={styles.table__footer}
          currentPageSize={currentPageSize}
          setCurrentPageSize={setCurrentPageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </VStack>
  );
};

export default TableSuppliers;
