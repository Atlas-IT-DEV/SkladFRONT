import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import MyModal from "../../myModal/my_modal";
import UlForTable from "../forTable/ulForTable/ul_for_table";
import styles from "../forTable/table.module.css";
import useWindowDimensions from "../../../hooks/window_dimensions";
import UlToClickWriteoff from "./ulToClickWriteoffs/ul_to_click_writeoff";
import { convertDateString } from "../../../helperFunc/convertDateToYesterday";
import WriteoffConfirmForm from "../../forms/writeOff/writeoff_confirm_form";
import { useCookies } from "react-cookie";

const TableWriteoffs = ({ getWriteOffList, writeoffList }) => {
  const [cookie, setCookie] = useCookies();
  const [sort, setSort] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState();
  const [writeOffId, setWriteOffId] = useState(-1);
  const { width, height } = useWindowDimensions();
  return (
    <Box
      className={styles.table__Box}
      overflowX={width <= 944 ? "scroll" : "auto"}
      display="block"
      width={width <= 944 ? "100%" : "100%"}
    >
      <MyModal
        visibleModal={visibleConfirmModal}
        setVisibleModal={setVisibleConfirmModal}
      >
        <WriteoffConfirmForm
          setVisibleModal={setVisibleConfirmModal}
          getWriteOffList={getWriteOffList}
          writeOffId={writeOffId}
        />
      </MyModal>
      <table className={styles.table} width={width <= 944 ? "944px" : "100%"}>
        <thead>
          <tr className={styles.table__thead_tr}>
            <td className={styles.table__td}>
              <UlForTable name="№" />
            </td>
            <td>
              <UlForTable sort={sort} setSort={setSort} name="Причина" />
            </td>
            <td>
              <UlForTable sort={sort} setSort={setSort} name="Комметнарий" />
            </td>
            <td>
              <UlForTable sort={sort} setSort={setSort} name="Клиент" />
            </td>
            <td>
              <UlForTable sort={sort} setSort={setSort} name="Оформил" />
            </td>
            <td>
              <UlForTable
                sort={sort}
                setSort={setSort}
                name="Дата подтверждения"
              />
            </td>
            <td className={styles.table__td}></td>
          </tr>
        </thead>
        <tbody>
          {writeoffList?.map((writeoff, index) => (
            <tr className={styles.table__tbody_tr} key={writeoff.id}>
              <td className={styles.table__td}>{writeoff.id}.</td>
              <td className={styles.table__td}>{writeoff.reason}</td>
              <td className={styles.table__td}>{writeoff.comment}</td>
              <td className={styles.table__td}>{writeoff.supplier.name}</td>
              <td className={styles.table__td}>{writeoff.user.userName}</td>
              <td className={styles.table__td}>
                {writeoff.dateOfConfirmation === null
                  ? "Не подтверждено"
                  : convertDateString(writeoff.dateOfConfirmation)}
              </td>
              <td className={styles.table__td}>
                {writeoff.dateOfConfirmation === null &&
                (cookie.warehouseId === writeoff.user.warehouseId ||
                  cookie.role === "ADMIN") ? (
                  <UlToClickWriteoff
                    writeoffId={writeoff.id}
                    setWriteOffId={setWriteOffId}
                    setVisibleConfirmModal={setVisibleConfirmModal}
                  />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default TableWriteoffs;
