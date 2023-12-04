export default function usePropertyValidationById(
  listPropertiesValidation,
  setListPropertiesValidation,
) {
  // Функция для смены статуса валидации у свойства в массиве listProperties, notation в данном случае значение false или true
  const helperSetListPropertiesValidation = (propertyId, notation) => {
    listPropertiesValidation.find((item) => item.id === propertyId).validity =
      notation;
    setListPropertiesValidation(listPropertiesValidation);
  };

  // Проверка на заполненность для listProperties
  const emptyValidation = (value, propertyId) => {
    if (value === "") {
      helperSetListPropertiesValidation(propertyId, false);
    } else {
      helperSetListPropertiesValidation(propertyId, true);
    }
  };

  const doubleСhangeability = (value, propertyId) => {
    console.log(value + "fsfsefs");
    const validated = value.match(/^(\d*\.{0,1}\d*$)/);
    if (validated && value[0] !== "0") {
      emptyValidation(value, propertyId);
      return true;
    }
    return false;
  };

  const integerСhangeability = (value, propertyId) => {
    const validated = value.match(/^(\d*$)/);
    if (validated && value[0] !== "0") {
      emptyValidation(value, propertyId);
      return true;
    }
    return false;
  };

  const booleanСhangeability = (value, propertyId) => {
    const validated = value.match(/^[01]$/);
    console.log(validated);
    if (validated) {
      emptyValidation(value, propertyId);
      return true;
    } else if (value === "") {
      helperSetListPropertiesValidation(propertyId, false);
      return true;
    }
    return false;
  };

  const dateСhangeability = (value, propertyId) => {
    const validated = value.match(/^\d{4}-\d{2}-\d{2}$/);
    console.log(validated);
    if (validated) {
      emptyValidation(value, propertyId);
      return true;
    } else if (value === "") {
      helperSetListPropertiesValidation(propertyId, false);
      return true;
    }
    return false;
  };

  // Здесь задаётся то каким образом доллжно проверяться свойство с определённым типом
  const propertycСhangeability = (value, propertyId, type) => {
    console.log(type);
    switch (type) {
      case "STRING":
        emptyValidation(value, propertyId);
        return true;
        break;
      case "DOUBLE":
        return doubleСhangeability(value, propertyId);
        break;
      case "INTEGER":
        return integerСhangeability(value, propertyId);
        break;
      case "BOOLEAN":
        return booleanСhangeability(value, propertyId);
        break;
      case "DATE":
        return dateСhangeability(value, propertyId);
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
