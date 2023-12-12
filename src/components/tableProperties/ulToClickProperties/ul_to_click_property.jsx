import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../images/edit.svg";
import delete_svg from "../../../images/delete.svg";
import styles from "./ul_to_click_property.module.css";
import PropertyService from "../../../API/property_service";

const UlToClickProperty = ({
  propertyId,
  setPropertyId,
  setVisibleEditModal,
  getPropertyList,
}) => {
  const handleRemoveProperties = async (purchaseId) => {
    try {
      if (window.confirm("Вы уверенны, что хотите удалить свойство?")) {
        await PropertyService.deleteProperty(purchaseId);
        getPropertyList();
      }
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }
  };
  return (
    <ul className={styles.UlToClick}>
      <li className={`${styles.UlToClick__li} ${styles.UlToClick__li_first}`}>
        <Image
          className={styles.UlToClick__Icon}
          src={edit}
          w="16px"
          h="16px"
          onClick={() => {
            setPropertyId(propertyId);
            setVisibleEditModal(true);
          }}
        />
      </li>
      <li className={styles.UlToClick__li}>
        <Image
          className={styles.UlToClick__Icon}
          src={delete_svg}
          w="16px"
          h="16px"
          onClick={() => {
            handleRemoveProperties(propertyId);
          }}
        />
      </li>
    </ul>
  );
};

export default UlToClickProperty;
