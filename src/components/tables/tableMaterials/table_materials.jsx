import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import styles from "../forTable/table.module.css";
import Pagination from "../../pagination/pagination";
import UlToClickMaterial from "./ulToClickMaterial/ul_to_click_material";
import UlForTable from "../forTable/ulForTable/ul_for_table";
import WarehouseToWarehouse from "../../forms/material/warehouse_to_warehouse";
import MyModal from "../../myModal/my_modal";

const TableMaterials = ({
  totalPages,
  materialList,
  setVisibleEditModal,
  setVisibleCreatePurchaseModal,
  setVisibleToWarehouse,
  setMaterialId,
  currentPage,
  setCurrentPage,
  currentPageSize,
  setCurrentPageSize,
  totalCountMaterials,
  warehouseId,
  materialId,
  getMaterialList,
}) => {
  const [sort, setSort] = useState(false);
  const [visibleWarehouseToWarehouse, setVisibleWarehouseToWarehouse] =
    useState(false);

  return (
    <Box className={styles.table__Box}>
      <MyModal
        visibleModal={visibleWarehouseToWarehouse}
        setVisibleModal={setVisibleWarehouseToWarehouse}
      >
        <WarehouseToWarehouse
          materialId={materialId}
          warehouseId={warehouseId}
          setVisibleModal={setVisibleWarehouseToWarehouse}
          getMaterialList={getMaterialList}
          visibleModal={visibleWarehouseToWarehouse}
        />
      </MyModal>
      <table className={styles.table}>
        <thead>
          <tr className={styles.table__thead_tr}>
            <td className={styles.table__td}>
              <UlForTable name="№" />
            </td>
            <td>
              <UlForTable
                sort={sort}
                setSort={setSort}
                name="Название материала"
              />
            </td>
            <td className={styles.table__td}>
              <UlForTable sort={sort} setSort={setSort} name="ТМЦ" />
            </td>
            <td className={styles.table__td}>
              <UlForTable sort={sort} setSort={setSort} name="Тип ТМЦ" />
            </td>
            <td className={styles.table__td}>
              <UlForTable sort={sort} setSort={setSort} name="Поставщики" />
            </td>
            <td className={styles.table__td}>
              <UlForTable
                sort={sort}
                setSort={setSort}
                name={
                  warehouseId === null
                    ? "Количество нераспределенных"
                    : warehouseId > 0
                    ? "Количество на складе"
                    : "Количество на всех складах"
                }
              />
            </td>
            <td className={styles.table__td}></td>
          </tr>
        </thead>
        <tbody>
          {materialList?.map((material, index) => (
            <tr className={styles.table__tbody_tr} key={material.id}>
              <td className={styles.table__td}>{index + 1}.</td>
              <td className={styles.table__td}>{material.name}</td>
              <td className={styles.table__td}>{material.tmcName}</td>
              <td className={styles.table__td}>{material.tmcTypeName}</td>
              <td className={styles.table__td}>{material.supplierNames}</td>
              <td className={styles.table__td}>{material.count}</td>
              <td>
                <UlToClickMaterial
                  warehouseId={warehouseId}
                  materialId={material.id}
                  setMaterialId={setMaterialId}
                  setVisibleEditModal={setVisibleEditModal}
                  setVisibleCreatePurchaseModal={setVisibleCreatePurchaseModal}
                  setVisibleToWarehouse={setVisibleToWarehouse}
                  setVisibleWarehouseToWarehouse={
                    setVisibleWarehouseToWarehouse
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalCountItem={totalCountMaterials}
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

export default TableMaterials;
