import React from "react";
import { Image } from "@chakra-ui/react";
import chevronUp from "../../../images/chevron-up.svg";
import noSort from "../../../images/no-sort.svg";
import styles from "./ul_for_table.module.css";

const UrForTable = ({ sort, setSort, name }) => {
  return (
    <ul className={styles.UlForTable}>
      <li>{name}</li>
      {sort ? (
        <li>
          <Image
            src={chevronUp}
            w="16px"
            h="16px"
            onClick={() => {
              setSort((prev) => !prev);
            }}
          />
        </li>
      ) : (
        <li>
          <Image
            src={noSort}
            w="16px"
            h="16px"
            onClick={() => {
              setSort((prev) => !prev);
            }}
          />
        </li>
      )}
    </ul>
  );
};

export default UrForTable;
