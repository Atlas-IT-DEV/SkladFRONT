import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import styles from "../forTable/table.module.css";
import Pagination from "../../pagination/pagination";
import UlToClickMaterial from "./ulToClickMaterial/ul_to_click_material";
import UlForTable from "../forTable/ulForTable/ul_for_table";
import WarehouseToWarehouse from "../../forms/material/warehouse_to_warehouse";
import MyModal from "../../myModal/my_modal";
import MaterialEditForm from "../../forms/material/material_edit_form";
import PurchaseCreateForm from "../../forms/purchase/purchase_create_form";
import MaterialToWarehouse from "../../forms/material/material_to_warehouse";

const TableMaterials = ({
  totalPages,
  materialList,
  currentPage,
  setCurrentPage,
  currentPageSize,
  setCurrentPageSize,
  totalCountMaterials,
  warehouseId,
  getMaterialList,
}) => {
  const [sort, setSort] = useState(false);
  const [materialId, setMaterialId] = useState(-1);
  const [visibleEditModal, setVisibleEditModal] = useState();
  const [visibleCreatePurchaseModal, setVisibleCreatePurchaseModal] =
    useState();
  const [visibleToWarehouse, setVisibleToWarehouse] = useState(false);
  const [userId, setUserId] = useState(1);
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
      <MyModal
        visibleModal={visibleEditModal}
        setVisibleModal={setVisibleEditModal}
      >
        <MaterialEditForm
          setVisibleModal={setVisibleEditModal}
          materialId={materialId}
          getMaterialList={getMaterialList}
        />
      </MyModal>
      <MyModal
        visibleModal={visibleCreatePurchaseModal}
        setVisibleModal={setVisibleCreatePurchaseModal}
      >
        <PurchaseCreateForm
          userId={userId}
          setVisibleModal={setVisibleCreatePurchaseModal}
          materialId={materialId}
        />
      </MyModal>
      <MyModal
        visibleModal={visibleToWarehouse}
        setVisibleModal={setVisibleToWarehouse}
      >
        <MaterialToWarehouse
          visibleModal={visibleToWarehouse}
          setVisibleModal={setVisibleToWarehouse}
          materialId={materialId}
          getMaterialList={getMaterialList}
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
                    ? "Количество на всех складах"
                    : warehouseId > 0
                    ? "Количество на складе"
                    : "Количество нераспределенных"
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
