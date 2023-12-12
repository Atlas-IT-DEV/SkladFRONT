import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../../images/edit.svg";
import delete_svg from "../../../../images/delete.svg";
import styles from "../../forTable/ul_to_click.module.css";
import TmcTypeService from "../../../../API/services/tmcType_service";

const UlToClickTmcType = ({
  tmcTypeId,
  setTmcTypeId,
  setVisibleEditModal,
  getTmcTypeList,
}) => {
  const handleRemoveTmcTypes = async (tmcTypeId) => {
    try {
      if (window.confirm("Вы уверенны, что хотите удалить свойство?")) {
        await TmcTypeService.deleteTmcType(tmcTypeId);
        getTmcTypeList();
      }
    } catch (error) {
      console.error("Error deleting tmcType:", error);
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
            setTmcTypeId(tmcTypeId);
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
            handleRemoveTmcTypes(tmcTypeId);
          }}
        />
      </li>
    </ul>
  );
};

export default UlToClickTmcType;
