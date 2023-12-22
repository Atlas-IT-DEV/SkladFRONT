import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../../images/edit.svg";
import styles from "../../forTable/ul_to_click.module.css";

const UlToClickMaterial = ({
  warehouseId,
  materialId,
  setMaterialId,
  setVisibleEditModal,
  setVisibleCreatePurchaseModal,
  setVisibleToWarehouse,
  setVisibleWarehouseToWarehouse,
}) => {
  return (
    <ul className={styles.UlToClick}>
      <li className={`${styles.UlToClick__li} ${styles.UlToClick__li_first}`}>
        <Image
          className={styles.UlToClick__Icon}
          src={edit}
          minH="16px"
          minW="16px"
          w="16px"
          h="16px"
          onClick={() => {
            setMaterialId(materialId);
            setVisibleEditModal(true);
          }}
        />
      </li>
      <li className={styles.UlToClick__li}>
        <button
          onClick={() => {
            setMaterialId(materialId);
            setVisibleCreatePurchaseModal(true);
          }}
        >
          Закупить
        </button>
      </li>
      <li className={styles.UlToClick__li}>
        <button
          onClick={() => {
            setMaterialId(materialId);
            setVisibleToWarehouse(true);
          }}
        >
          Перемещение
        </button>
      </li>
      {warehouseId > 0 ? (
        <li className={styles.UlToClick__li}>
          <button
            onClick={() => {
              setMaterialId(materialId);
              setVisibleWarehouseToWarehouse(true);
            }}
          >
            Перемещение на другой склад
          </button>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

export default UlToClickMaterial;
