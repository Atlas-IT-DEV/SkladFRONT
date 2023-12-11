import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import styles from "./table_purchases.module.css";
import Pagination from "../pagination/pagination";
import PurchaseService from "../../API/purchase_service";
import UrForTable from "../tableMaterials/ulForTable/ul_for_table";
import UlToClickPurchase from "./ulToClickPurchase/ul_to_click_purchase";

const TablePurchases = ({
  totalPages,
  purchaseList,
  setVisibleEditPurchaseModal,
  setPurchaseId,
  getPurchaseList,
  currentPage,
  setCurrentPage,
  currentPageSize,
  setCurrentPageSize,
  totalCountPurchases,
}) => {
  const [sort, setSort] = useState(false);
  const handleRemovePurchase = async (purchaseId) => {
    try {
      if (window.confirm("Вы уверенны, что хотите удалить покупку?")) {
        await PurchaseService.deletePurchase(purchaseId).then(() => {
          getPurchaseList();
        });
      }
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }
  };

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = `${(day < 10 ? "0" : "") + day}.${
      (month < 10 ? "0" : "") + month
    }.${year}`;
    return formattedDate;
  };

  return (
    <Box className={styles.table__Box}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.table__thead_tr}>
            <td className={styles.table__td}>
              <UrForTable name="№" />
            </td>
            <td>
              <UrForTable
                sort={sort}
                setSort={setSort}
                name="Название покупки"
              />
            </td>
            <td className={styles.table__td}>
              <UrForTable sort={sort} setSort={setSort} name="Номер артикула" />
            </td>
            <td className={styles.table__td}>
              <UrForTable sort={sort} setSort={setSort} name="Количество" />
            </td>
            <td className={styles.table__td}>
              <UrForTable sort={sort} setSort={setSort} name={"Цена"} />
            </td>
            <td className={styles.table__td}>
              <UrForTable sort={sort} setSort={setSort} name={"Поставщик"} />
            </td>
            <td className={styles.table__td}>
              <UrForTable sort={sort} setSort={setSort} name={"Время"} />
            </td>
            <td className={styles.table__td}></td>
          </tr>
        </thead>
        <tbody>
          {purchaseList?.map((purchase, index) => (
            <tr className={styles.table__tbody_tr} key={purchase.id}>
              <td className={styles.table__td}>{index + 1}.</td>
              <td className={styles.table__td}>{purchase.materialName}</td>
              <td className={styles.table__td}>{purchase.articleNumber}</td>
              <td className={styles.table__td}>{purchase.count}</td>
              <td className={styles.table__td}>{purchase.price}</td>
              <td className={styles.table__td}>{purchase.supplier?.name}</td>
              <td className={styles.table__td}>
                {convertDate(purchase.dateTime)}
              </td>
              <td className={styles.table__td}>
                <UlToClickPurchase
                  purchaseId={purchase.id}
                  setPurchaseId={setPurchaseId}
                  setVisibleEditPurchaseModal={setVisibleEditPurchaseModal}
                  handleRemovePurchase={handleRemovePurchase}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalCountPurchases={totalCountPurchases}
        className={styles.table__footer}
        currentPageSize={currentPageSize}
        setCurrentPageSize={setCurrentPageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default TablePurchases;
