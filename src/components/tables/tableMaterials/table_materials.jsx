import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import styles from "../forTable/table.module.css";
import Pagination from "../../pagination/pagination";
import MaterialService from "../../../API/services/material_service";
import UlToClickMaterial from "./ulToClickMaterial/ul_to_click_material";
import UlForTable from "../forTable/ulForTable/ul_for_table";

const TableMaterials = ({
  totalPages,
  materialList,
  setVisibleEditModal,
  setVisibleCreatePurchaseModal,
  setVisibleToWarehouse,
  setMaterialId,
  getMaterialList,
  currentPage,
  setCurrentPage,
  currentPageSize,
  setCurrentPageSize,
  totalCountMaterials,
  warehouseId,
}) => {
  const [sort, setSort] = useState(false);
  const handleRemoveMaterial = async (materialId) => {
    try {
      if (window.confirm("Вы уверенны, что хотите удалить материал?")) {
        await MaterialService.deleteMaterial(materialId).then(() => {
          getMaterialList();
        });
      }
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  return (
    <Box className={styles.table__Box}>
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
              <td className={styles.table__td}>
                <UlToClickMaterial
                  materialId={material.id}
                  setMaterialId={setMaterialId}
                  setVisibleEditModal={setVisibleEditModal}
                  setVisibleCreatePurchaseModal={setVisibleCreatePurchaseModal}
                  handleRemoveMaterial={handleRemoveMaterial}
                  setVisibleToWarehouse={setVisibleToWarehouse}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalCountMaterials={totalCountMaterials}
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
