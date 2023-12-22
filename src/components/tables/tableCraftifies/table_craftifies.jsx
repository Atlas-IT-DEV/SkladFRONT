import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import MyModal from "../../myModal/my_modal";
import UlForTable from "../forTable/ulForTable/ul_for_table";
import styles from "../forTable/table.module.css";
import UlToClickCraftify from "./ulToClickCraftify/ul_to_click_craftify";
import CraftifyEditForm from "../../forms/craftify/craftify_edit_form";

const TableCraftifies = ({ getCraftifyList, craftifyList }) => {
  const [sort, setSort] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState();

  const [craftifyId, setCraftifyId] = useState(-1);

  return (
    <Box className={styles.table__Box}>
      <MyModal
        visibleModal={visibleEditModal}
        setVisibleModal={setVisibleEditModal}
      >
        <CraftifyEditForm
          setVisibleModal={setVisibleEditModal}
          getCraftifyList={getCraftifyList}
          craftifyId={craftifyId}
        />
      </MyModal>
      <table className={styles.table}>
        <thead>
          <tr className={styles.table__thead_tr}>
            <td className={styles.table__td}>
              <UlForTable name="№" />
            </td>
            <td>
              <UlForTable sort={sort} setSort={setSort} name="Название" />
            </td>
            <td className={styles.table__td}></td>
          </tr>
        </thead>
        <tbody>
          {craftifyList?.map((craftify, index) => (
            <tr className={styles.table__tbody_tr} key={craftify.id}>
              <td className={styles.table__td}>{index + 1}.</td>
              <td className={styles.table__td}>{craftify.name}</td>
              <td className={styles.table__td}>
                <UlToClickCraftify
                  craftifyId={craftify.id}
                  setCraftifyId={setCraftifyId}
                  setVisibleEditModal={setVisibleEditModal}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default TableCraftifies;
