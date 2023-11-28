import { useState } from "react";

export default function usePropertyValidation() {
  // Состояние для отслеживания валидации свойств listProperties
  const [listPropertiesValidation, setListPropertiesValidation] = useState([
    true,
    true,
    true,
    true,
  ]);

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
    switch (type) {
      case "string":
        emptyValidation(value, propertyIndex);
        return true;
        break;
      case "double":
        return doubleСhangeability(value, propertyIndex);
        break;
      case "integer":
        return integerСhangeability(value, propertyIndex);
        break;
      case "boolean":
        return booleanСhangeability(value, propertyIndex);
        break;
      case "date":
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
