import React, { useState } from "react";
import { Box, Image, Stack, VStack } from "@chakra-ui/react";
import styles from "./table.module.css";
import UrForTable from "./ulForTable/ul_for_table";
import { Instance } from "../../API/instance";
import UlToClick from "./ulToClick/ul_to_click";

const Table = ({
  materialList,
  setVisibleModal,
  setMaterialId,
  getMaterialList,
}) => {
  console.log(materialList);
  const [sort, setSort] = useState(false);

  const handleRemoveMaterial = async (materialId) => {
    try {
      const response = await Instance.delete(`/api/materials/${materialId}`);
      console.log("Deleting material:", response);
      getMaterialList();
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  return (
    <Box width="100%">
      <table className={styles.table}>
        <thead>
          <tr>
            <td>
              <UrForTable
                className={styles.table__ul}
                sort={sort}
                setSort={setSort}
                name="№"
              />
            </td>
            <td>
              <UrForTable
                sort={sort}
                setSort={setSort}
                name="Название материала"
              />
            </td>
            <td>
              <UrForTable sort={sort} setSort={setSort} name="ТМЦ" />
            </td>
            {/*Тип ТМЦ*/}
            <td>
              <UrForTable sort={sort} setSort={setSort} name="Тип" />
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {materialList?.map((material, index) => (
            <tr key={material.id}>
              <td>{index}</td>
              <td>{material.name}</td>
              <td>{material.tmc.name}</td>
              <td>{material.tmcType.name}</td>
              <td>
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
      <div className={styles.table__footer}>sdsd</div>
    </Box>
  );
};

export default Table;
