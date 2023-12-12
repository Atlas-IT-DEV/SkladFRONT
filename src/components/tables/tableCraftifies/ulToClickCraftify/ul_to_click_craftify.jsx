import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../../images/edit.svg";
import delete_svg from "../../../../images/delete.svg";
import styles from "../../forTable/ul_to_click.module.css";
import CraftifyService from "../../../../API/services/craftify_service";

const UlToClickCraftify = ({
  craftifyId,
  setCraftifyId,
  setVisibleEditModal,
  getCraftifyList,
}) => {
  const handleRemoveCraftifies = async (craftifyId) => {
    try {
      if (window.confirm("Вы уверенны, что хотите удалить свойство?")) {
        await CraftifyService.deleteCraftify(craftifyId);
        getCraftifyList();
      }
    } catch (error) {
      console.error("Error deleting craftify: ", error);
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
            setCraftifyId(craftifyId);
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
            handleRemoveCraftifies(craftifyId);
          }}
        />
      </li>
    </ul>
  );
};

export default UlToClickCraftify;
