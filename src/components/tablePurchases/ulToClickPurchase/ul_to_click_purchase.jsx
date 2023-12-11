import React from "react";
import { Image } from "@chakra-ui/react";
import edit from "../../../images/edit.svg";
import delete_svg from "../../../images/delete.svg";
import styles from "./ul_to_click_purchase.module.css";

const UlToClickPurchase = ({
  purchaseId,
  setPurchaseId,
  setVisibleEditPurchaseModal,
  handleRemovePurchase,
}) => {
  return (
    <ul className={styles.UlToClick}>
      <li className={`${styles.UlToClick__li} ${styles.UlToClick__li_first}`}>
        <Image
          className={styles.UlToClick__Icon}
          src={edit}
          w="16px"
          h="16px"
          onClick={() => {
            setPurchaseId(purchaseId);
            setVisibleEditPurchaseModal(true);
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
            handleRemovePurchase(purchaseId);
          }}
        />
      </li>
    </ul>
  );
};

export default UlToClickPurchase;
