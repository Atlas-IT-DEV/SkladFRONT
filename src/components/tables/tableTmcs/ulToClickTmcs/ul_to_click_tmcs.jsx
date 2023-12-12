import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../../images/edit.svg";
import delete_svg from "../../../../images/delete.svg";
import styles from "./ul_to_click_tmcs.module.css";
import TmcService from "../../../../API/tmc_service";

const UlToClickTmc = ({ tmcId, setTmcId, setVisibleEditModal, getTmcList }) => {
  const handleRemoveTmcs = async (tmcId) => {
    try {
      if (window.confirm("Вы уверенны, что хотите удалить свойство?")) {
        await TmcService.deleteTmc(tmcId);
        getTmcList();
      }
    } catch (error) {
      console.error("Error deleting tmc:", error);
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
            setTmcId(tmcId);
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
            handleRemoveTmcs(tmcId);
          }}
        />
      </li>
    </ul>
  );
};

export default UlToClickTmc;
