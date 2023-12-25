export const materialPropertyDTOListToArray = (materialPropertyDTOList) => {
  return Array.from(materialPropertyDTOList.entries(), ([key, value]) => ({
    propertyId: key,
    value,
  }));
};

export const mapPropertiesValidationToArray = (map) => {
  return Array.from(map.values());
};
