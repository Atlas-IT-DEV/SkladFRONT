import React from "react";
import Select from "react-select";

const FormikSelect = ({
  isMulti,
  selectRef,
  placeholder,
  formik,
  name,
  options,
  onChange,
  defaultValue,
}) => {
  const styles =
    formik?.errors[name] && formik?.touched[name]
      ? {
          borderColor: "crimson",
          boxShadow: "0 0 0 1px crimson",
        }
      : "";
  return (
    <div>
      <label>{placeholder}</label>
      <Select
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        defaultValue={defaultValue}
        ref={selectRef}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 3,
          }),
          control: (base) => ({
            ...base,
            ...styles,
          }),
        }}
        options={options}
        onChange={(e) => {
          onChange ? onChange(e) : formik.setFieldValue(name, e.value);
        }}
        placeholder={placeholder}
      ></Select>
    </div>
  );
};

export default FormikSelect;
