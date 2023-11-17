import { useState } from "react";

export default function usePropertyValidation() {
  // Состояние для отслеживания валидации свойств listProperties
  const [listPropertiesValidation, setListPropertiesValidation] = useState([
    true,
    true,
    true,
    false,
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
    const validated = value.match(/^(\d*\.{0,1}\d{0,2}$)/);
    if (validated && value[0] !== "0") {
      emptyValidation(value, propertyIndex);
      return true;
    }
    emptyValidation(value, propertyIndex);
    return false;
  };

  const integerСhangeability = (value, propertyIndex) => {
    const validated = value.match(/^(\d*$)/);
    if (validated && value[0] !== "0") {
      emptyValidation(value, propertyIndex);
      return true;
    }
    emptyValidation(value, propertyIndex);
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
