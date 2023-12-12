import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import MyModal from "../../myModal/my_modal";
import UlForTable from "../tableMaterials/ulForTable/ul_for_table";
import styles from "../tableMaterials/table_materials.module.css";
import UlToClickProperty from "./ulToClickProperties/ul_to_click_property";
import PropertyEditForm from "../../forms/property/property_edit_form";

const TableProperties = ({
  getPropertyList,
  propertyList,
  setVisibleCreateModal,
}) => {
  const [sort, setSort] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState();

  const [propertyId, setPropertyId] = useState(-1);

  return (
    <Box className={styles.table__Box}>
      <MyModal
        visibleModal={visibleEditModal}
        setVisibleModal={setVisibleEditModal}
      >
        <PropertyEditForm
          setVisibleModal={setVisibleEditModal}
          getPropertyList={getPropertyList}
          propertyId={propertyId}
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
              <UlForTable sort={sort} setSort={setSort} name="Тип" />
            </td>
            <td className={styles.table__td}></td>
          </tr>
        </thead>
        <tbody>
          {propertyList?.map((property, index) => (
            <tr className={styles.table__tbody_tr} key={property.id}>
              <td className={styles.table__td}>{index + 1}.</td>
              <td className={styles.table__td}>{property.name}</td>
              <td className={styles.table__td}>{property.type}</td>
              <td className={styles.table__td}>
                <UlToClickProperty
                  propertyId={property.id}
                  setPropertyId={setPropertyId}
                  setVisibleEditModal={setVisibleEditModal}
                  setVisibleCreateModal={setVisibleCreateModal}
                  getPropertyList={getPropertyList}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default TableProperties;