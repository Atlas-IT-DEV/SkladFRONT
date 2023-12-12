import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import MyModal from "../../myModal/my_modal";
import UlForTable from "../tableMaterials/ulForTable/ul_for_table";
import styles from "../tableMaterials/table_materials.module.css";
import UlToClickTmc from "./ulToClickTmcs/ul_to_click_tmcs";
import { Select } from "chakra-react-select";
import TmcEditForm from "../../forms/tmc/tmc_edit_form";

const TableTmcs = ({ getTmcList, tmcList, setVisibleCreateModal }) => {
  const [sort, setSort] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState();

  const [tmcId, setTmcId] = useState(-1);

  return (
    <Box className={styles.table__Box}>
      <MyModal
        visibleModal={visibleEditModal}
        setVisibleModal={setVisibleEditModal}
      >
        <TmcEditForm
          setVisibleModal={setVisibleEditModal}
          getTmcList={getTmcList}
          tmcId={tmcId}
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
            <td className={styles.table__td}>
              <UlForTable sort={sort} setSort={setSort} name="Свойства" />
            </td>
            <td className={styles.table__td}></td>
          </tr>
        </thead>
        <tbody>
          {tmcList?.map((tmc, index) => (
            <tr className={styles.table__tbody_tr} key={tmc.id}>
              <td className={styles.table__td}>{index + 1}.</td>
              <td className={styles.table__td}>{tmc.name}</td>
              <td className={styles.table__td}>
                <ul>
                  {/*{tmc.properties.map((property) => {*/}
                  {/*  return (*/}
                  {/*    <li key={property.id}>*/}
                  {/*      {property.name} {property.type}*/}
                  {/*    </li>*/}
                  {/*  );*/}
                  {/*})}*/}
                  <Select
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
                    options={tmc.properties.map((property) => {
                      return {
                        label: property.name + " " + property.type,
                      };
                    })}
                    placeholder={"Свойства"}
                  />
                </ul>
                {tmc.type}
              </td>
              <td className={styles.table__td}>
                <UlToClickTmc
                  tmcId={tmc.id}
                  setTmcId={setTmcId}
                  setVisibleEditModal={setVisibleEditModal}
                  setVisibleCreateModal={setVisibleCreateModal}
                  getTmcList={getTmcList}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default TableTmcs;
