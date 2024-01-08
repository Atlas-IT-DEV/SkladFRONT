import React from "react";
import { Select } from "chakra-react-select";

const FormikSelect = ({ selectRef, label, formik, name, options }) => {
  return (
    <div>
      <label>{label}</label>
      <Select
        ref={selectRef}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 3 }) }}
        isInvalid={formik.errors[name] && formik.touched[name]}
        errorBorderColor="crimson"
        options={options}
        onChange={(e) => formik.setFieldValue(name, e.value)}
        placeholder={label}
      ></Select>
    </div>
  );
};

export default FormikSelect;
