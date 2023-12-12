import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../../images/edit.svg";
import delete_svg from "../../../../images/delete.svg";
import styles from "../../forTable/ul_to_click.module.css";
import PropertyService from "../../../../API/services/property_service";

const UlToClickProperty = ({
  propertyId,
  setPropertyId,
  setVisibleEditModal,
  getPropertyList,
}) => {
  const handleRemoveProperties = async (propertyId) => {
    try {
      if (window.confirm("Вы уверенны, что хотите удалить свойство?")) {
        await PropertyService.deleteProperty(propertyId);
        getPropertyList();
      }
    } catch (error) {
      console.error("Error deleting property:", error);
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
