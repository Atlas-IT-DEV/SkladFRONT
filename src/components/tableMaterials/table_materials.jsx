import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import styles from "./table_materials.module.css";
import UrForTable from "./ulForTable/ul_for_table";
import UlToClick from "./ulToClick/ul_to_click";
import Pagination from "../pagination/pagination";
import MaterialService from "../../API/material_service";

const TableMaterials = ({
  totalPages,
  materialList,
  setVisibleModal,
  setMaterialId,
  getMaterialList,
  currentPage,
  setCurrentPage,
  currentPageSize,
  setCurrentPageSize,
  totalCountMaterials,
}) => {
  const [sort, setSort] = useState(false);
  const handleRemoveMaterial = async (materialId) => {
    try {
      if (window.confirm("Вы уверенны, что хотите удалить материал?")) {
        await MaterialService.deleteMaterial(materialId);
        getMaterialList();
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
              <UrForTable sort={sort} setSort={setSort} name="№" />
            </td>
            <td>
              <UrForTable
                sort={sort}
                setSort={setSort}
                name="Название материала"
              />
            </td>
            <td className={styles.table__td}>
              <UrForTable sort={sort} setSort={setSort} name="ТМЦ" />
            </td>
            {/*Тип ТМЦ*/}
            <td className={styles.table__td}>
              <UrForTable sort={sort} setSort={setSort} name="Тип ТМЦ" />
            </td>
            <td className={styles.table__td}>
              <UrForTable sort={sort} setSort={setSort} name="Поставщики" />
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
              <td className={styles.table__td}>
                <UlToClick
                  materialId={material.id}
                  setMaterialId={setMaterialId}
                  setVisibleModal={setVisibleModal}
                  handleRemoveMaterial={handleRemoveMaterial}
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
