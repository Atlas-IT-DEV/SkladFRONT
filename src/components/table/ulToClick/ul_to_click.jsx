import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../images/edit.svg";
import delete_svg from "../../../images/delete.svg";
import styles from "./ul_to_click.module.css";

const UlToClick = ({
  materialId,
  setMaterialId,
  setVisibleModal,
  handleRemoveMaterial,
}) => {
  return (
    <ul className={styles.UlToClick}>
      <li className={styles.UlToClick__li__first}>
        <Image
          className={styles.UlToClick__Icon}
          src={edit}
          w="16px"
          h="16px"
          onClick={() => {
            setMaterialId(materialId);
            setVisibleModal(true);
          }}
        />
      </li>
      <li>
        <Image
          className={styles.UlToClick__Icon}
          src={delete_svg}
          w="16px"
          h="16px"
          onClick={() => {
            handleRemoveMaterial(materialId);
          }}
        />
      </li>
    </ul>
  );
};

export default UlToClick;
