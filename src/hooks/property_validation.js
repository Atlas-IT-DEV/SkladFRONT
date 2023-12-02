import { useState } from "react";

export default function usePropertyValidation(
  listPropertiesValidation,
  setListPropertiesValidation,
) {
  // Функция для смены статуса валидации у свойства в массиве listProperties, notation в данном случае значение false или true
  const helperSetListPropertiesValidation = (propertyIndex, notation) => {
    listPropertiesValidation[propertyIndex] = notation;
    setListPropertiesValidation(listPropertiesValidation);
  };

  // Проверка на заполненность для listProperties
  const emptyValidation = (value, propertyIndex) => {
    if (value === "") {
      helperSetListPropertiesValidation(propertyIndex, false);
    } else {
      helperSetListPropertiesValidation(propertyIndex, true);
    }
  };

  const doubleСhangeability = (value, propertyIndex) => {
    console.log(value + "fsfsefs");
    const validated = value.match(/^(\d*\.{0,1}\d*$)/);
    if (validated && value[0] !== "0") {
      emptyValidation(value, propertyIndex);
      return true;
    }
    return false;
  };

  const integerСhangeability = (value, propertyIndex) => {
    const validated = value.match(/^(\d*$)/);
    if (validated && value[0] !== "0") {
      emptyValidation(value, propertyIndex);
      return true;
    }
    return false;
  };

  const booleanСhangeability = (value, propertyIndex) => {
    const validated = value.match(/^[01]$/);
    console.log(validated);
    if (validated) {
      emptyValidation(value, propertyIndex);
      return true;
    } else if (value === "") {
      helperSetListPropertiesValidation(propertyIndex, false);
      return true;
    }
    return false;
  };

  const dateСhangeability = (value, propertyIndex) => {
    const validated = value.match(/^\d{4}-\d{2}-\d{2}$/);
    console.log(validated);
    if (validated) {
      emptyValidation(value, propertyIndex);
      return true;
    } else if (value === "") {
      helperSetListPropertiesValidation(propertyIndex, false);
      return true;
    }
    return false;
  };

  // Здесь задаётся то каким образом доллжно проверяться свойство с определённым типом
  const propertycСhangeability = (value, propertyIndex, type) => {
    console.log(type);
    switch (type) {
      case "STRING":
        emptyValidation(value, propertyIndex);
        return true;
        break;
      case "DOUBLE":
        return doubleСhangeability(value, propertyIndex);
        break;
      case "INTEGER":
        return integerСhangeability(value, propertyIndex);
        break;
      case "BOOLEAN":
        return booleanСhangeability(value, propertyIndex);
        break;
      case "DATE":
        return dateСhangeability(value, propertyIndex);
        break;
      default:
        return false;
        break;
    }
  };

  return [
    propertycСhangeability,
    listPropertiesValidation,
    setListPropertiesValidation,
  ];
}
