import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import MyModal from "../../myModal/my_modal";
import UlForTable from "../forTable/ulForTable/ul_for_table";
import styles from "../forTable/table.module.css";
import useWindowDimensions from "../../../hooks/window_dimensions";
import UlToClickWriteoff from "./ulToClickWriteoffs/ul_to_click_writeoff";

const TableWriteoffs = ({ getWriteoffList, writeoffList }) => {
  const [sort, setSort] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState();

  const [writeoffId, setWriteoffId] = useState(-1);
  const { width, height } = useWindowDimensions();
  return (
    <Box
      className={styles.table__Box}
      overflowX={width <= 944 ? "scroll" : "auto"}
      display="block"
      width={width <= 944 ? "100%" : "100%"}
    >
      <MyModal
        visibleModal={visibleEditModal}
        setVisibleModal={setVisibleEditModal}
      >
        {/*        <WriteoffEditForm
          setVisibleModal={setVisibleEditModal}
          getWriteoffList={getWriteoffList}
          writeoffId={writeoffId}
        />*/}
      </MyModal>
      <table className={styles.table} width={width <= 944 ? "944px" : "100%"}>
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
          {writeoffList?.map((writeoff, index) => (
            <tr className={styles.table__tbody_tr} key={writeoff.id}>
              <td className={styles.table__td}>{index + 1}.</td>
              <td className={styles.table__td}>{writeoff.name}</td>
              <td className={styles.table__td}>
                <UlToClickWriteoff
                  writeoffId={writeoff.id}
                  setWriteoffId={setWriteoffId}
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

export default TableWriteoffs;
