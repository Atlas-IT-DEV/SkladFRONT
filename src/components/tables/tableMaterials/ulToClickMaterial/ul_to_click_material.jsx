import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../../images/edit.svg";
import styles from "../../forTable/ul_to_click.module.css";
import { CiShoppingCart } from "react-icons/ci";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2"
import { CiEdit } from "react-icons/ci";

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
        <button onClick={() => {
            setMaterialId(materialId);
            setVisibleEditModal(true);
          }}>
            <CiEdit/>
          </button>
      </li>
      <li className={styles.UlToClick__li}>
        <button
          onClick={() => {
            setMaterialId(materialId);
            setVisibleCreatePurchaseModal(true);
          }}
        >
          <CiShoppingCart width='16px' height='16px'/>
        </button>
      </li>
      <li className={styles.UlToClick__li}>
        <button
          onClick={() => {
            setMaterialId(materialId);
            setVisibleToWarehouse(true);
          }}
        >
          <HiOutlineArrowsRightLeft  />
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
